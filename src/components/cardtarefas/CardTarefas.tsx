import './CardTarefas.css';
import Tarefas from '../../models/Tarefas.ts';
import { useState } from 'react';
import { atualizar, deletar } from '../../services/Service.ts';

interface CardProps {
    tarefa: Tarefas;
    onUpdate?: (tarefaAtualizada: Tarefas) => void;
    onDelete?: (id: number) => void;
}

function CardTarefas({ tarefa, onUpdate }: CardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitulo, setEditedTitulo] = useState(tarefa.titulo);
    const [editedDescricao, setEditedDescricao] = useState(tarefa.descricao);

    const handleOverlayClick = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        resetEditFields();
    };

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const resetEditFields = () => {
        setEditedTitulo(tarefa.titulo);
        setEditedDescricao(tarefa.descricao);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedTarefa = { ...tarefa, titulo: editedTitulo, descricao: editedDescricao };

            await atualizar('/tarefas', updatedTarefa, (data: Tarefas) => {
                if (onUpdate) {
                    onUpdate(data);
                }
            });

            alert('Tarefa foi atualizada com sucesso!');
            setIsEditing(false);

        } catch (error) {

            console.error('Erro ao atualizar tarefa:', error);
            alert('Erro ao atualizar tarefa.');
        }
    };

    const handleDelete = async () => {
        try {
            await deletar(`/tarefas/${tarefa.id}`)
            alert('Tarefa apagada com sucesso')

        } catch (error) {
            console.error('Erro ao apagar tarefa:', error)
            alert('Erro ao apagar tarefa.')
        }


    };

    return (
        <>
            <div className="card">
                <div className="task">
                    <div id="titulo">{tarefa.titulo}</div>
                    <div id="descricao">{tarefa.descricao}</div>
                </div>
                <button className="button-3d" onClick={() => setIsModalOpen(true)}>
                    <span className="text">Detalhes</span>
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content" onClick={handleModalContentClick}>
                        <div className="modal-body" id="modal-detalhes-corpo">
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        value={editedTitulo}
                                        onChange={(e) => setEditedTitulo(e.target.value)}
                                        placeholder="Título"
                                        required
                                    />
                                    <textarea
                                        value={editedDescricao}
                                        onChange={(e) => setEditedDescricao(e.target.value)}
                                        placeholder="Descrição"
                                        required
                                    />
                                    <button type="submit" className="button-3d">
                                        <span className="text">Salvar</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="button-3d"
                                        onClick={() => {
                                            setIsEditing(false);
                                            resetEditFields();
                                        }}
                                    >
                                        <span className="text">Cancelar</span>
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <h1 id="modal-titulo">{tarefa.titulo}</h1>
                                    <p>{tarefa.descricao}</p>
                                    <div className="action-buttons">
                                        <button className="button-3d" id="button-editar" onClick={() => setIsEditing(true)}>
                                            <span className="text">Editar</span>
                                        </button>
                                        <button className="button-3d" id="button-excluir" onClick={handleDelete}>
                                            <span className="text">Excluir</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CardTarefas;
