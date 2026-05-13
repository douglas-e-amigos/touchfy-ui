"use client";

import { LockIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { AutenticarUsuarioRequest } from "../../features/usuario/models/dto.model";
import { LoginForm } from "../../features/usuario/models/form.model";
import { authService } from "../../features/usuario/services/auth.service";
import FyButton from "../../shared/components/fy-button/FyButton";
import FyInput from "../../shared/components/fy-input/FyInput";
import { useForm } from "../../shared/hooks/use-form";
import { dependencies, validateLogin } from "./validation";
import { useRouter } from "next/navigation";
import { notificationService } from "../../shared/services/notification.service";
import { getHttpErrorMessage } from "../../shared/utils/http-error";


export default function Login() {
    const router = useRouter();

    const { values, errors, handleChange, isValid } = useForm<LoginForm>({
        nomeUsuario: '',
        senha: '',
    }, validateLogin, dependencies)

    const onSubmit = async () => {
        if (!isValid()) {
            notificationService.showErrorForSeconds({
                title: 'Não foi possível entrar',
                message: 'Corrija os campos do formulário e tente novamente.',
            }, 5);
            return;
        }

        const dto: AutenticarUsuarioRequest = values;

        try {
            await authService.autenticarUsuario(dto);
            notificationService.showSuccessForSeconds({
                title: 'Login realizado com sucesso',
                message: 'Redirecionando para o dashboard.',
            }, 2);

            setTimeout(() => {
                router.push('/dashboard');
            }, 1200);
        } catch (error) {
            console.error('Houve um erro: ', error);
            notificationService.showErrorForSeconds({
                title: 'Erro ao realizar login',
                message: getHttpErrorMessage(error, 'Verifique suas credenciais e tente novamente.'),
            }, 6);
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <h2>Login</h2>
                    <span>Comece sua jornada musical gratuitamente</span>
                </div>
                <div className="flex flex-col gap-y-3">
                    <FyInput id="nome-usuario-id" name="nome-usuario" label="Nome de usuário"
                        placeholder="Seu nome de usuário" icon={<UserIcon />}
                        onChange={(value) => handleChange("nomeUsuario", value)}
                        value={values.nomeUsuario}
                        error={errors.nomeUsuario}
                    ></FyInput>
                    <FyInput id="senha-id" name="senha" label="Senha"
                        placeholder="Sua senha" icon={<LockIcon />}
                        onChange={(value) => handleChange("senha", value)}
                        value={values.senha}
                        error={errors.senha} type="password"
                    ></FyInput>
                    <FyButton onClick={onSubmit}>
                        Entrar
                    </FyButton>
                </div>
                <div className="text-sm text-gray-400">
                    <span>Não tem uma conta? </span>
                    <Link href="/register" className="text-primary underline underline-offset-4">
                        Criar conta
                    </Link>
                </div>
            </div>
        </div>
    )
}