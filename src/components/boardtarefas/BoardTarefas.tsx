import { FaPlusCircle } from "react-icons/fa";
import CardTarefas from '../../components/cardtarefas/CardTarefas';
import { useEffect, useState } from "react";
import './BoardTarefas.css'
import { buscar } from "../../services/Service";
import Tarefas from "../../models/Tarefas";
import FormTarefa from "../formtarefa/FormTarefa";

function BoardTarefas() {
    const [tarefas, setTarefas] = useState<Tarefas[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedListId, setSelectedListId] = useState<number | null>(null);

    async function buscarTarefas() {
        try {
            await buscar('/tarefas', setTarefas)
        } catch (error) {
            console.error(error)
        }
    }

    const lists = [
        {
            id: 1,
            title: "A fazer",
            status: 0
        },
        {
            id: 2,
            title: "Em andamento",
            status: 1
        },
        {
            id: 3,
            title: "Concluído",
            status: 2
        }
    ];

    useEffect(() => {
        buscarTarefas()
    }, [tarefas.length])

    const handleAddCard = (listId: number) => {
        setSelectedListId(listId);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedListId(null);
        buscarTarefas();
    }

    return (
        <>

            <div className="board">
                <div className="lists-container">
                    {lists.map(list => (
                        <div
                            key={list.id}
                            className="list"
                        >
                            <h2>{list.title}</h2>
                            <div>
                                {tarefas
                                    .filter(tarefa => tarefa.status === list.status)
                                    .map((tarefa) => (
                                        <CardTarefas key={tarefa.id} tarefa={tarefa} />
                                    ))
                                }
                            </div>
                            <button className="add-card" onClick={() => handleAddCard(list.id)} >
                                <FaPlusCircle className="add-card-icon" />
                                ADICIONAR CARD
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" 
                onClick={handleCloseModal}>
                    <div className="modal-content" id="modal-add-card" onClick={e => e.stopPropagation()}>
                        <FormTarefa listStatus={lists.find(list => list.id === selectedListId)?.status} />
                        
                    </div>
                </div>
            )}
        </>
    )
}

export default BoardTarefas

