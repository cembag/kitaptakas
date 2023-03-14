import "../modals.scss"
import "./signup.modal.scss"
import { CgClose } from "react-icons/cg"
import { setSignupModal } from "../../../provider/modals/modals.reducer"
import { useAppDispatch, useTypedSelector } from "../../../provider/store"
import useTranslation from "../../../translation/use.translation"

export default function SignupModal(): JSX.Element {
    
    const translation = useTranslation()
    const dispatch = useAppDispatch()
    const modal = useTypedSelector(state => state.modals.signUp)
    
    return (
        <>{
            modal && (
                <div id="signup-modal" className="modal-bg" onClick={() => dispatch(setSignupModal(false))}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-container">
                            <header>
                                <div className="empty"></div>
                                <h2>{translation.signup}</h2>
                                <div className="close-button" onClick={() => dispatch(setSignupModal(false))}>
                                    <CgClose className="close-icon"/>
                                </div>
                            </header>
                        </div>
                    </div>
                </div>
            )
        }</>
    )
}