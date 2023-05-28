import "./footer.scss"
import { ReactComponent as AppStoreImg } from '../../assets/images/ic_app-store.svg';
import { ReactComponent as GooglePlayImg } from '../../assets/images/ic_google-play.svg';
import { MdKeyboardArrowDown } from "react-icons/md"
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs"
import {BiWorld} from "react-icons/bi"
import { useState } from "react";
import useWindowDimensions from "../../hooks/use.window.dimensions";
import { useAppDispatch, useTypedSelector } from "../../provider/store";
import languageWords from "../../context/language/language.words";
import { setLanguageModal } from "../../provider/modals/modals.reducer";
import { useNavigate } from "react-router-dom";


export default function Footer(): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [dropdown, setDropdown] = useState<DropdownType>("default")

    const dropdownList = [
        "default",
        "keşfet",
        "yardım",
        "iş"
    ] as const

    type DropdownType = typeof dropdownList[number]

    const language = useTypedSelector(state => state.language)
    const { width } = useWindowDimensions()
    

    return (
        <footer id="footer" className="padding-side">

            <nav className="footer-nav">

                <div className="footer-items">
                    <div className="footer-item">
                        <header className="footer-item-header">
                            <h2><b>kitaptakas</b> uygulamasını indirin.</h2>
                        </header>
                        <a href=""><AppStoreImg className="store" /></a>
                        <a href=""><GooglePlayImg className="store" /></a>
                    </div>

                    <div className="footer-item dropdown">
                        <header className="footer-item-header" onClick={() => setDropdown(dropdown === "yardım" ? "default" : "yardım")} style={{ marginBottom: dropdown === "yardım" ? "15px" : width <= 1000 ? "0px" : "15px" }}>
                            <h2>Yardıma mı ihtiyacınız var?</h2>
                            <div className="dropdown-arrow">
                                <MdKeyboardArrowDown className="arrow-icon" style={{ transform: dropdown === "yardım" ? "rotate(180deg)" : "rotate(0deg)" }} />
                            </div>
                        </header>
                        <div className="links-wrapper" style={{ height: dropdown === "yardım" ? "165px" : width <= 1000 ? "0px" : "165px", opacity: dropdown === "yardım" ? "1" : width <= 1000 ? "0" : "1" }}>
                            <ul className="links">
                                <li className="link" onClick={() => navigate("/sss", {state: {index: 0}})}><a href="">Sıkça Sorulan Sorular</a></li>
                                <li className="link" onClick={() => navigate("/sss", {state: {index: 1}})}><a href="">Kullanım Koşulları</a></li>
                                <li className="link" onClick={() => navigate("/sss", {state: {index: 2}})}><a href="">Gizlilik Politikası</a></li>
                                <li className="link" onClick={() => navigate("/sss", {state: {index: 3}})}><a href="">Çerez Politikası</a></li>
                                <li className="link" onClick={() => navigate("/sss", {state: {index: 4}})}><a href="">Kişisel Verilerin Korunması</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

                <article className="footer-article">
                    <div className="left">
                        <span className="kitaptakas">© 2023 Kitaptakas</span>
                        <div/>
                        <a href=""><span>Bilgi Toplumu Hizmetleri</span></a>
                    </div>

                    <div className="right">
                        <ol className="socials">
                            <li><a href=""><BsFacebook className="social-icon"/></a></li>
                            <li><a href=""><BsTwitter className="social-icon"/></a></li>
                            <li><a href=""><BsInstagram className="social-icon"/></a></li>
                        </ol>
                        <div className="language noselect" onClick={() => dispatch(setLanguageModal(true))}>
                            <BiWorld className="language-icon"/>
                            <span>{`${languageWords[language]} (${language.toUpperCase()})`}</span>
                        </div>
                    </div>
                </article>

            </nav>

        </footer>
    )
}