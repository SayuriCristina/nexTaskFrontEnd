import { ChangeEvent, useState } from "react";
import { cadastrar } from "../../services/Service";
import './FormTarefa.css'
import Tarefas from '../../models/Tarefas';

interface FormTarefaProps {
    listStatus?: number;
}

function FormTarefa({ listStatus }: FormTarefaProps) {

    const [tarefas, setTarefas] = useState<Tarefas>({
        status: listStatus || 0
    } as Tarefas);
    
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTarefas({
            ...tarefas,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovaTarefa(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            await cadastrar(`/tarefas`, tarefas, setTarefas)
            alert('Tarefa foi criada com sucesso!')
        } catch {
            alert('Erro ao cadastrar tarefa.')
        }

    }




    return (
        <>
            <div className='form-tarefa'>
                <h1>
                    Cadastrar Tarefa
                </h1>

                <form onSubmit={gerarNovaTarefa}>
                    <div>
                        <label htmlFor="titulo">Título da Tarefa</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Escreva aqui seu título"
                            name="titulo"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div>
                        <label htmlFor="descricao">Descrição</label>
                        <input className="input"
                            type="text"
                            placeholder="Descreva aqui sua tarefa"
                            name="descricao"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button type="submit" className='button-3d'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </>
    )
}

export default FormTarefa