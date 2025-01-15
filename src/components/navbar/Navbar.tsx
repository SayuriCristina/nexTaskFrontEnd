import "./Navbar.css"
import { IoSearch } from "react-icons/io5";
import { FiInfo } from "react-icons/fi";

function Navbar() {
    return (
        <>
            <div className="navbar">
                <img src="src/assets/nextask_logo.png" id="logo"></img>
                <div className="input-container">
                    <IoSearch className="input-icon" />
                    <input type="text" placeholder="Pesquisa..." className="input-box" />
                </div>
                <button id="info"><FiInfo size={34}/></button>
            </div >
        </>
    )
}

export default Navbar