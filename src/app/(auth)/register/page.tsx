"use client";

import { User as UserIcon, Lock as LockIcon, MailIcon, CalendarIcon } from "lucide-react";
import FyInput from "../../shared/components/fy-input/FyInput";
import { useForm } from "../../shared/hooks/use-form";
import { RegisterForm } from "../../features/usuario/models/form.model";
import { validateRegister, dependencies } from "./validation";
import FyButton from "../../shared/components/fy-button/FyButton";
import { usuarioService } from "../../features/usuario/services/usuario.service";
import { CriarUsuarioRequest } from "../../features/usuario/models/dto.model";
import { parseDate } from "../../shared/utils/date";

export default function Register() {
    const { values, errors, handleChange, isValid } = useForm<RegisterForm>({
        nome: '', email: '', nomeUsuario: '',
        senha: '', senhaNovamente: '', dataNascimento: ''
    }, validateRegister, dependencies)

    const onSubmit = () => {
        if (!isValid()) return;
        const { dataNascimento, ...fields } = values;
        const dto: CriarUsuarioRequest = {
            dataNascimento: parseDate(values.dataNascimento)!,
            ...fields
        }
        usuarioService.cadastrarUsuario(dto).then(() => {
            console.log('Usuário cadastrado com sucesso!')
        }).catch(err => {
            console.error('Houve um erro:', err)
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
                    <FyInput id="nome-id" name="nome" label="Nome Completo"
                        placeholder="Seu nome" icon={<UserIcon />}
                        onChange={(value) => handleChange("nome", value)}
                        error={errors.nome}
                    ></FyInput>
                    <FyInput id="nome-usuario-id" name="nome-usuario" label="Nome de usuário"
                        placeholder="Seu nome de usuário" icon={<UserIcon />}
                        onChange={(value) => handleChange("nomeUsuario", value)}
                        error={errors.nomeUsuario}
                    ></FyInput>
                    <FyInput id="email-id" name="email" label="E-mail"
                        placeholder="Seu e-mail" icon={<MailIcon />}
                        onChange={(value) => handleChange("email", value)}
                        error={errors.email}
                    ></FyInput>
                    <FyInput id="data-nascimento-id" name="data-nascimento" label="Data de nascimento"
                        placeholder="Sua data de nascimento" icon={<CalendarIcon />}
                        onChange={(value) => handleChange("dataNascimento", value)}
                        error={errors.dataNascimento} type="date"
                    ></FyInput>
                    <FyInput id="senha-id" name="senha" label="Senha"
                        placeholder="Sua senha" icon={<LockIcon />}
                        onChange={(value) => handleChange("senha", value)}
                        error={errors.senha} type="password"
                    ></FyInput>
                    <FyInput id="senha-novamente-id" name="senha-novamente" label="Senha novamente"
                        placeholder="Sua senha" icon={<LockIcon />}
                        onChange={(value) => handleChange("senhaNovamente", value)}
                        error={errors.senhaNovamente} type="password"
                    ></FyInput>
                    <FyButton onClick={onSubmit}>
                        Criar conta
                    </FyButton>
                </div>
                <div>
                    {/* links */}
                </div>
            </div>
        </div>
    );
}