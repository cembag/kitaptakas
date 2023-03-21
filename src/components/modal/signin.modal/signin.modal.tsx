import "../modals.scss"
import "./signin.modal.scss"
import { CgClose } from "react-icons/cg"
import { BsCheckLg } from "react-icons/bs"
import { setSigninModal, setSignupModal } from "../../../provider/modals/modals.reducer"
import { useAppDispatch, useTypedSelector } from "../../../provider/store"
import useTranslation from "../../../translation/use.translation"
import { useState } from "react"
import isValidEmail from "../../../utils/email.validator"
import InputA from "../../input/input.a/input.a"
import AuthDal from "../../../dal/auth/auth.dal"

export default function SigninModal(): JSX.Element {

    const authDal = new AuthDal()
    const translation = useTranslation()
    const dispatch = useAppDispatch()
    const modal = useTypedSelector(state => state.modals.signIn)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const changeModal = () => {
        const signinModal = document.getElementById("signin-modal")
        if(signinModal) {
            signinModal.style.scale = "0";
        }
        setTimeout(() => {
            dispatch(setSigninModal(false))
            dispatch(setSignupModal(true))
        }, 500)
    }

    return (
        <>{
            modal && (
                <div className="modal-bg" onClick={() => dispatch(setSigninModal(false))}>
                    <div id="signin-modal" className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-container">
                            <header>
                                <div className="empty"></div>
                                <h2>{translation.login}</h2>
                                <div className="close-button" onClick={() => dispatch(setSigninModal(false))}>
                                    <CgClose className="close-icon" />
                                </div>
                            </header>

                            <form>
                                <InputA placeHolder="Your email" value={email} setState={setEmail} type={"email"}/>
                                <InputA placeHolder="Your password" value={password} setState={setPassword} type={"password"}/>
                                <div className="space"></div>
                                <button className="signin-button" style={{background: (isValidEmail(email) && password.length > 6) ? "var(--theme-color)" : "rgb(160, 160, 160)", cursor: isValidEmail(email) && password.length > 6 ? "pointer" : "not-allowed"}} 
                                onClick={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                
                                    if(isValidEmail(email) && password.length > 6) {
                                        await authDal.signIn(email, password)
                                    }
                                }}>{translation.login}</button>
                            </form>
                        </div>

                        <nav>
                            <span>Hala kayıt olmadınız mı? <a onClick={changeModal}>Kayıt ol</a></span>
                        </nav>
                    </div>
                </div>
            )
        }</>
    )
}