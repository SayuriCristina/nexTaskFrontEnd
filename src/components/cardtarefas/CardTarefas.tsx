import './CardTarefas.css';
import Tarefas from '../../models/Tarefas.ts';
import { useState } from 'react';

interface CardProps {
    tarefa: Tarefas;
}

function CardTarefas({ tarefa }: CardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOverlayClick = () => {
        setIsModalOpen(false);
    };

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
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
                        <div className='modal-body' id='modal-detalhes-corpo'>
                            <h1 id='modal-titulo'>{tarefa.titulo}</h1>
                            <p>{tarefa.descricao}</p>
                            <div className='action-buttons'>
                                <button className="button-3d"  id='button-editar'>
                                    <span className="text">Editar</span>
                                </button>
                                <button className="button-3d" id='button-excluir'>
                                    <span className="text">Excluir</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CardTarefas;
