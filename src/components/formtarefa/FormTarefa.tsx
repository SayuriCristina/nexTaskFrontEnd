import { ChangeEvent, useEffect, useState } from "react";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import './FormTarefa.css'
import Tarefas from '../../models/Tarefas';
import { useParams } from "react-router-dom";

interface FormTarefaProps {
    listStatus?: number;
}

function FormTarefa({ listStatus }: FormTarefaProps) {

    const [tarefas, setTarefas] = useState<Tarefas>({
        status: listStatus || 0
    } as Tarefas);
    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/tarefas/${id}`, setTarefas)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTarefas({
            ...tarefas,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovaTarefa(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await atualizar(`/tarefas`, tarefas, setTarefas)
            } catch {
                alert('Erro ao atualizar tarefa')
            }
        } else {
            try {
                await cadastrar(`/tarefas`, tarefas, setTarefas)
                alert('Tarefa foi criada com sucesso!')
            } catch {
                alert('Erro ao cadastrar tarefa.')
            }

        }
    }



    return (
        <>
            <div className='form-tarefa'>
                <h1>
                    {id === undefined ? 'Cadastrar Tarefa' : 'Editar Tarefa'}
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
                        {id === undefined ? 'Cadastrar' : 'Atualizar'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default FormTarefa
