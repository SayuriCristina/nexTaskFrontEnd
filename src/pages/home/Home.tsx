import './Home.css'
import { FaPlus } from "react-icons/fa6";

function Home() {
    return (
        <div>

            <button className="button-3d square" role="button">
                <span className="text">Botão</span>
            </button>
            <br/>
            <br/>
            <br/>
            <button className="button-3d round" role="button">
                <FaPlus size={20} />
            </button>
            <h1 className="text-3d">ADICIONAR CARD</h1>
        </div>

    )
}

export default Home