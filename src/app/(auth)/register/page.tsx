"use client";

import { User as UserIcon, Lock as LockIcon, MailIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import FyInput from "../../shared/components/fy-input/FyInput";
import { useForm } from "../../shared/hooks/use-form";
import { RegisterForm } from "../../features/usuario/models/form.model";
import { validateRegister, dependencies } from "./validation";
import FyButton from "../../shared/components/fy-button/FyButton";
import { usuarioService } from "../../features/usuario/services/usuario.service";
import { CriarUsuarioRequest } from "../../features/usuario/models/dto.model";
import { notificationService } from "../../shared/services/notification.service";
import { getHttpErrorMessage } from "../../shared/utils/http-error";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

    const { values, errors, handleChange, isValid } = useForm<RegisterForm>({
        nome: '', email: '', nomeUsuario: '',
        senha: '', senhaNovamente: '', dataNascimento: ''
    }, validateRegister, dependencies)

    const onSubmit = async () => {
        if (!isValid()) {
            notificationService.showErrorForSeconds({
                title: 'Não foi possível criar a conta',
                message: 'Corrija os campos do formulário e tente novamente.',
            }, 5);
            return;
        }

        const { dataNascimento, ...fields } = values;
        const dto: CriarUsuarioRequest = {
            dataNascimento,
            ...fields
        };

        try {
            await usuarioService.cadastrarUsuario(dto);
            notificationService.showSuccessForSeconds({
                title: 'Conta criada com sucesso',
                message: 'Você será redirecionado para a tela de login.',
            }, 2);

            setTimeout(() => {
                router.push('/login');
            }, 1200);
        } catch (error) {
            console.error('Houve um erro:', error);
            notificationService.showErrorForSeconds({
                title: 'Erro ao criar a conta',
                message: getHttpErrorMessage(error, 'Tente novamente em instantes.'),
            }, 6);
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <h2>Criar conta</h2>
                    <span>Comece sua jornada musical gratuitamente</span>
                </div>
                <div className="flex flex-col gap-y-3">
                    <FyInput id="nome-id" name="nome" label="Nome Completo"
                        placeholder="Seu nome" icon={<UserIcon />}
                        onChange={(value) => handleChange("nome", value)}
                        value={values.nome}
                        error={errors.nome}
                    ></FyInput>
                    <FyInput id="nome-usuario-id" name="nome-usuario" label="Nome de usuário"
                        placeholder="Seu nome de usuário" icon={<UserIcon />}
                        onChange={(value) => handleChange("nomeUsuario", value)}
                        value={values.nomeUsuario}
                        error={errors.nomeUsuario}
                    ></FyInput>
                    <FyInput id="email-id" name="email" label="E-mail"
                        placeholder="Seu e-mail" icon={<MailIcon />}
                        onChange={(value) => handleChange("email", value)}
                        value={values.email}
                        error={errors.email}
                    ></FyInput>
                    <FyInput id="data-nascimento-id" name="data-nascimento" label="Data de nascimento"
                        placeholder="Sua data de nascimento" icon={<CalendarIcon />}
                        onChange={(value) => handleChange("dataNascimento", value)}
                        value={values.dataNascimento}
                        error={errors.dataNascimento} type="date"
                    ></FyInput>
                    <FyInput id="senha-id" name="senha" label="Senha"
                        placeholder="Sua senha" icon={<LockIcon />}
                        onChange={(value) => handleChange("senha", value)}
                        value={values.senha}
                        error={errors.senha} type="password"
                    ></FyInput>
                    <FyInput id="senha-novamente-id" name="senha-novamente" label="Senha novamente"
                        placeholder="Sua senha" icon={<LockIcon />}
                        onChange={(value) => handleChange("senhaNovamente", value)}
                        value={values.senhaNovamente}
                        error={errors.senhaNovamente} type="password"
                    ></FyInput>
                    <FyButton onClick={onSubmit}>
                        Criar conta
                    </FyButton>
                </div>
                <div className="text-sm text-gray-400">
                    <span>Já tem uma conta? </span>
                    <Link href="/login" className="text-primary underline underline-offset-4">
                        Fazer login
                    </Link>
                </div>
            </div>
        </div>
    );
}