import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { FiInfo } from "react-icons/fi";
import { useState } from "react";

function Navbar({ tarefas, setFilteredTarefas }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        setFilteredTarefas(
            tarefas.filter((tarefa) =>
                tarefa.titulo.toLowerCase().includes(value)
            )
        );
    };

    return (
        <div className="navbar">
            <img src="https://imgur.com/a/iugdiausggfias-lrHOQwG" id="logo" alt="Nextask Logo" />
            <div className="input-container">
                <IoSearch className="input-icon" />
                <input
                    type="text"
                    placeholder="Pesquisa..."
                    className="input-box"
                    value={query}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}

export default Navbar;
