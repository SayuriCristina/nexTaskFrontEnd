import './Footer.css'
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-content">
                    <p className="footer-title">Criado por <span className="highlight">Sayuri Cristina Souza e Silva</span></p>
                    <p className="footer-subtitle">Acesse minhas redes sociais:</p>
                    <div className="social-icons">
                        <a href='https://github.com/SayuriCristina'>
                            <FaGithub size={24} />
                        </a>

                        <a href='https://www.linkedin.com/in/sayuri-cristina'>
                            <FaLinkedinIn size={26} />
                        </a>

                        <a href='mailto:sayuri.cristinass@gmail.com'>
                            <MdEmail size={28} />
                        </a>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Footer;