import './Home.css'

const lists = [
    {
        id: 'todo',
        title: 'A Fazer',
        cards: [
            { id: '1', titulo: 'Primeira tarefa', descricao: 'Primeira tarefa' },
            { id: '2', titulo: 'Segunda tarefa', descricao: 'Primeira tarefa' },
        ]
    },
    {
        id: 'doing',
        title: 'Em Andamento',
        cards: [
            { id: '3', titulo: 'Tarefa em progresso', descricao: 'Primeira tarefa' },
        ]
    },
    {
        id: 'done',
        title: 'Concluído',
        cards: [
            { id: '4', titulo: 'Tarefa finalizada', descricao: 'Primeira tarefa' },
        ]
    }
];

function Home() {

    return (
        <div className="trello-board">
            <div className="lists-container">
                {lists.map(list => (
                    <div key={list.id} className="list">
                        <h2>{list.title}</h2>
                        <div className="cards-container">
                            {list.cards.map(card => (
                                <div key={card.id} className="card">
                                    <div className='task'>
                                        <div id='titulo'>
                                            {card.titulo}
                                        </div>
                                        <div id='descricao'>
                                            {card.descricao}
                                        </div>
                                    </div>
                                    <button className="button-3d square">
                                        <span className="text">Botão</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="text-3d">
                            ADICIONAR CARD
                        </button>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Home;