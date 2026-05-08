"use client";

import { LockIcon, UserIcon } from "lucide-react";
import { AutenticarUsuarioRequest } from "../../features/usuario/models/dto.model";
import { LoginForm } from "../../features/usuario/models/form.model";
import { authService } from "../../features/usuario/services/auth.service";
import FyButton from "../../shared/components/fy-button/FyButton";
import FyInput from "../../shared/components/fy-input/FyInput";
import { useForm } from "../../shared/hooks/use-form";
import { dependencies, validateLogin } from "./validation";
import { useRouter } from "next/navigation";


export default function Login() {
    const router = useRouter();

    const { values, errors, handleChange, isValid } = useForm<LoginForm>({
        nomeUsuario: '',
        senha: '',
    }, validateLogin, dependencies)

    const onSubmit = () => {
        if (!isValid()) return;
        const dto: AutenticarUsuarioRequest = values;
        authService.autenticarUsuario(dto).then(() => {
            console.log('Usuário logado com sucesso!')
            router.push('/dashboard')
        }).catch(err => {
            console.error('Houve um erro: ', err);
        })
    }

    return (
        <div>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <h2>Criar conta</h2>
                    <span>Comece sua jornada musical gratuitamente</span>
                </div>
                <div className="flex flex-col gap-y-3">
                    <FyInput id="nome-usuario-id" name="nome-usuario" label="Nome de usuário"
                        placeholder="Seu nome de usuário" icon={<UserIcon />}
                        onChange={(value) => handleChange("nomeUsuario", value)}
                        error={errors.nomeUsuario}
                    ></FyInput>
                    <FyInput id="senha-id" name="senha" label="Senha"
                        placeholder="Sua senha" icon={<LockIcon />}
                        onChange={(value) => handleChange("senha", value)}
                        error={errors.senha} type="password"
                    ></FyInput>
                    <FyButton onClick={onSubmit}>
                        Entrar
                    </FyButton>
                </div>
                <div>
                    {/* links */}
                </div>
            </div>
        </div>
    )
}