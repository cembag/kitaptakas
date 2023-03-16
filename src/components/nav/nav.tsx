import "./nav.scss"
import {BiWorld} from "react-icons/bi"
import {RiUserFill, RiUserAddFill} from "react-icons/ri"
import { useAppDispatch, useTypedSelector } from "../../provider/store"
import { setLanguageModal, setSigninModal, setSignupModal } from "../../provider/modals/modals.reducer"
import languageWords from "../../context/language/language.words"
import useTranslation from "../../translation/use.translation"

export default function Nav(): JSX.Element {

    const translation = useTranslation()
    const dispatch = useAppDispatch()
    const language = useTypedSelector(state => state.language)

    return (
        <nav id="nav" role="navigation" className="padding-side">
            <div className="nav-container">
                <div className="left">
                    kitaptakas
                </div>
                <div className="right row noselect">
                    <div className="nav-item" onClick={() => dispatch(setLanguageModal(true))}>
                        <BiWorld className="icon"/>
                        <span className="text">{`${languageWords[language]} (${language.toUpperCase()})`}</span>
                    </div>
                    <div className="nav-item" onClick={() => dispatch(setSigninModal(true))}>
                        <RiUserFill className="icon"/>
                        <span className="text">{translation.login}</span>
                    </div>
                    <div className="nav-item" onClick={() => dispatch(setSignupModal(true))}>
                        <RiUserAddFill className="icon"/>
                        <span className="text">Kayıt ol</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}