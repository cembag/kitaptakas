import "../modals.scss"
import "./signin.modal.scss"
import { CgClose } from "react-icons/cg"
import { setSigninModal } from "../../../provider/modals/modals.reducer"
import { useAppDispatch, useTypedSelector } from "../../../provider/store"
import useTranslation from "../../../translation/use.translation"

export default function SigninModal(): JSX.Element {
    
    const translation = useTranslation()
    const dispatch = useAppDispatch()
    const modal = useTypedSelector(state => state.modals.signIn)
    
    return (
        <>{
            modal && (
                <div id="signin-modal" className="modal-bg" onClick={() => dispatch(setSigninModal(false))}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-container">
                            <header>
                                <div className="empty"></div>
                                <h2>{translation.login}</h2>
                                <div className="close-button" onClick={() => dispatch(setSigninModal(false))}>
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