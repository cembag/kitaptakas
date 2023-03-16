import "./snackbar.scss"
import { useTypedSelector } from "../../provider/store"

export default function Snackbar(): JSX.Element {

    const snackbar = useTypedSelector(state => state.snackbar)
    const snackbarId: string = "snackbar" + snackbar.id

    return (
        <>{
            snackbar.active && (
                <div id={snackbarId} className="snackbar">
                
                </div>
            )
        }</>
    )
}