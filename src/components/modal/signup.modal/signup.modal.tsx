import "../modals.scss"
import "./signup.modal.scss"
import { useState } from "react"
import { CgClose } from "react-icons/cg"
import { BsCheckLg } from "react-icons/bs"
import { setSigninModal, setSignupModal } from "../../../provider/modals/modals.reducer"
import { useAppDispatch, useTypedSelector } from "../../../provider/store"
import useTranslation from "../../../translation/use.translation"
import InputA from "../../input/input.a/input.a"
import isValidEmail from "../../../utils/email.validator"
import AuthDal from "../../../dal/auth/auth.dal"

export default function SignupModal(): JSX.Element {

    const translation = useTranslation()
    const dispatch = useAppDispatch()
    const authDal = new AuthDal()
    const modal = useTypedSelector(state => state.modals.signUp)
    
    
    const [username, setUsername] = useState<string>("")
    
    const [email, setEmail] = useState<string>("")

    const [password, setPassword] = useState<string>("")
    
    const [isChecked, setIsChecked] = useState<boolean>(false)
    
    const [running, setRunning] = useState<boolean>(false)
    
    const changeModal = () => {
        const signupModal = document.getElementById("signup-modal")
        if(signupModal) {
            signupModal.style.scale = "0";
        }
        setTimeout(() => {
            dispatch(setSignupModal(false))
            dispatch(setSigninModal(true))
        }, 500)
    }
    
    return (
        <>{
            modal && (
                <div className="modal-bg" onClick={() => dispatch(setSignupModal(false))}>
                    <div id="signup-modal" className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-container">
                            <header>
                                <div className="empty"></div>
                                <h2>{translation.signup}</h2>
                                <div className="close-button" onClick={() => dispatch(setSignupModal(false))}>
                                    <CgClose className="close-icon"/>
                                </div>
                            </header>

                            <form onSubmit={() => false}>
                                <InputA placeHolder="Username" value={username} setState={setUsername} type={"text"}/>
                                <InputA placeHolder="Your email" value={email} setState={setEmail} type={"email"}/>
                                <InputA placeHolder="Your password" value={password} setState={setPassword} type={"password"}/>
                                <div className="checkbox-container noselect" onClick={() => setIsChecked(prev => !prev)}>
                                    <div className="checkbox" style={{border: isChecked ? "2px solid var(--theme-color)" : "2px solid rgb(230, 230, 230)", background: isChecked ? "var(--theme-color)" : "rgba(255, 255, 255, 0)"}}>
                                        <BsCheckLg className="checkbox-icon"/>
                                    </div>
                                    <span><b>kitaptakas</b>'ın bana özel kampanya, tanıtım ve fırsatlarından haberdar olmak istiyorum.</span>
                                </div>

                                <span className="info">Kişisel verilerinize dair Aydınlatma Metni için <a href="">tıklayınız</a>. Üye olmakla, <a href="">Kullanım Koşulları</a> hükümlerini kabul etmektesiniz.</span>

                                <div className="space"></div>

                                <button className="signup-button" style={{background: (isValidEmail(email) && password.length > 6) ? "var(--theme-color)" : "rgb(160, 160, 160)", cursor: isValidEmail(email) && password.length > 6 ? "pointer" : "not-allowed"}}
                                onClick={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                
                                    if(isValidEmail(email) && password.length > 6) {
                                        try {
                                            setRunning(true)
                                            await authDal.register(email, password, {username: username});
                                            dispatch(setSignupModal(false));
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }
                                }}>{translation.signup}</button>
                            </form>
                        </div>
                        
                        <nav>
                            <span><b>kitaptakas</b>'a üye misiniz? <a onClick={changeModal}>{translation.login}</a></span>
                        </nav>
                    </div>
                </div>
            )
        }</>
    )
}