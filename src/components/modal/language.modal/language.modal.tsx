import "../modals.scss"
import "./language.modal.scss"
import { useState } from "react"
import { CgClose } from "react-icons/cg"
import { setLanguageModal } from "../../../provider/modals/modals.reducer";
import { useAppDispatch, useTypedSelector } from "../../../provider/store"
import supportedLanguages, { LanguageType } from "../../../context/language/supported.languages";
import languageWords from "../../../context/language/language.words";
import { changeLanguage } from "../../../provider/language/language";
import useWindowDimensions from "../../../hooks/use.window.dimensions";

export default function LanguageModal(): JSX.Element {

    const dispatch = useAppDispatch()
    const globalState = useTypedSelector(state => state)
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>("tr")
    const { width } = useWindowDimensions()

    return (
        <>{
            globalState.modals.language && (
                <div id="language-modal" className="modal-bg" onClick={(e) => dispatch(setLanguageModal(false))}>
                    <div className="modal" onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <div className="modal-container">
                            <header>
                                <div className="empty"></div>
                                <h2>Dil Değiştir</h2>
                                <div className="close-button" onClick={() => dispatch(setLanguageModal(false))}>
                                    <CgClose className="close-icon"/>
                                </div>
                            </header>

                            <div className="language-options">
                                {
                                    supportedLanguages.map((language, index) => {
                                        return (
                                            <div key={index} className="option" onClick={() => setSelectedLanguage(language)} style={{background: selectedLanguage === language ? width <= 500 ? "rgba(var(--theme-color-rgb), .1)" : "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0)"}}>
                                                    <div className="row ai-center">
                                                        <div className="checkbox" style={{border: selectedLanguage === language ? "2px solid var(--theme-color)" : "2px solid rgb(240, 240, 240)"}}>
                                                            <div className="circle" style={{scale: selectedLanguage === language ? "1" : "0"}}></div>
                                                        </div>
                                                        <span className="language" style={{color: selectedLanguage === language ? "var(--theme-color)" : "var(--color-black-smooth)"}}>{languageWords[language]}</span>
                                                    </div>
                                                    <div className="flag">
                                                        <img src={require("../../../assets/images/flags/" + language + ".webp")} alt="" />
                                                    </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div style={{flex: width <= 500 ? "1" : "0"}}></div>

                            <div className="update-button noselect" style={{background: globalState.language === selectedLanguage ? "rgb(160, 160, 160)" : "var(--theme-color)", cursor: globalState.language === selectedLanguage ? "not-allowed" : "pointer"}} 
                            onClick={() => {
                                if(globalState.language !== selectedLanguage) {
                                    dispatch(changeLanguage(selectedLanguage))
                                    dispatch(setLanguageModal(false))
                                }
                            }}>Güncelle</div>
                        </div>
                    </div>
                </div>
            )
        }</>
    )
}