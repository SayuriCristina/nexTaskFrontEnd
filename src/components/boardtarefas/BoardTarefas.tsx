import { FaPlusCircle } from "react-icons/fa";
import CardTarefas from '../../components/cardtarefas/CardTarefas';
import { useEffect, useState } from "react";
import './BoardTarefas.css';
import { atualizar, buscar } from "../../services/Service";
import Tarefas from "../../models/Tarefas";
import FormTarefa from "../formtarefa/FormTarefa";
import Navbar from "../navbar/Navbar";

function BoardTarefas() {
    const [tarefas, setTarefas] = useState<Tarefas[]>([]);
    const [filteredTarefas, setFilteredTarefas] = useState<Tarefas[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedListId, setSelectedListId] = useState<number | null>(null);

    async function buscarTarefas() {
        try {
            await buscar('/tarefas', (data) => {
                setTarefas(data);
                setFilteredTarefas(data); // Inicialmente, todas as tarefas são exibidas.
            });
        } catch (error) {
            console.error(error);
        }
    }

    const lists = [
        {
            id: 1,
            title: "A fazer",
            status: 0,
        },
        {
            id: 2,
            title: "Em andamento",
            status: 1,
        },
        {
            id: 3,
            title: "Concluído",
            status: 2,
        },
    ];

    useEffect(() => {
        buscarTarefas();
    }, []);

    const handleAddCard = (listId: number) => {
        setSelectedListId(listId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedListId(null);
        buscarTarefas();
    };

    return (
        <>
            <Navbar tarefas={tarefas} setFilteredTarefas={setFilteredTarefas} />

            <div className="board">
                <div className="lists-container">
                    {lists.map((list) => (
                        <div
                        className="list"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={async (e) => {
                            e.preventDefault();
                            const droppedTarefa = JSON.parse(e.dataTransfer.getData('text/plain')) as Tarefas;
                            const newStatus = list.status;
                    
                            try {
                                const updatedTarefa = { ...droppedTarefa, status: newStatus };
                                await atualizar('/tarefas', updatedTarefa, (data: Tarefas) => {
                                    setTarefas((prevTarefas) =>
                                        prevTarefas.map((t) => (t.id === data.id ? data : t))
                                    );
                                    setFilteredTarefas((prevFiltered) =>
                                        prevFiltered.map((t) => (t.id === data.id ? data : t))
                                    );
                                });
                            } catch (error) {
                                console.error('Erro ao atualizar status da tarefa:', error);
                            }
                        }}
                    >
                        <h2>{list.title}</h2>
                        <div>
                            {filteredTarefas
                                .filter((tarefa) => tarefa.status === list.status)
                                .map((tarefa) => (
                                    <CardTarefas key={tarefa.id} tarefa={tarefa} onUpdate={buscarTarefas} />
                                ))}
                        </div>
                        <button className="add-card" onClick={() => handleAddCard(list.id)}>
                            <FaPlusCircle className="add-card-icon" />
                            ADICIONAR CARD
                        </button>
                    </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div
                        className="modal-content"
                        id="modal-add-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FormTarefa
                            listStatus={lists.find((list) => list.id === selectedListId)?.status}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default BoardTarefas;
