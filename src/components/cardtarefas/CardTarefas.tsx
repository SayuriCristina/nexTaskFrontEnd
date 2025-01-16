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
            window.location.reload(); // Recarrega a página após salvar

        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            alert('Erro ao atualizar tarefa.');
        }
    };

    const handleDelete = async () => {
        try {
            await deletar(`/tarefas/${tarefa.id}`);
            alert('Tarefa apagada com sucesso');
            window.location.reload(); // Recarrega a página após exclusão

        } catch (error) {
            console.error('Erro ao apagar tarefa:', error);
            alert('Erro ao apagar tarefa.');
        }
    };

    return (
        <>
            <article
                className="card"
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify(tarefa));
                }}
            >
                <header className="task">
                    <p id="titulo">{tarefa.titulo}</p>
                    <p id="descricao">{tarefa.descricao}</p>
                </header>
                <button className="button-3d" onClick={() => setIsModalOpen(true)}>
                    <span className="text">Detalhes</span>
                </button>
            </article>

            {isModalOpen && (
                <section className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content" onClick={handleModalContentClick}>
                        <div className="modal-body" id="modal-detalhes-corpo">
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="titulo">Título:</label>
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedTitulo}
                                        onChange={(e) => setEditedTitulo(e.target.value)}
                                        placeholder="Título"
                                        required
                                    />
                                    <label htmlFor="descricao">Descrição:</label>
                                    <textarea
                                        className="input"
                                        id="descricao"
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
                                    <header>
                                        <h1 id="modal-titulo">{tarefa.titulo}</h1>
                                    </header>
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
                </section>
            )}
        </>
    );
}

export default CardTarefas;
