import LanguageModal from "./language.modal/language.modal";
import SigninModal from "./signin.modal/signin.modal";
import SignupModal from "./signup.modal/signup.modal";
import TradeModal from "./trade.modal/trade.modal";

export default function Modals(): JSX.Element {
    return (
        <>
            <LanguageModal/>
            <SigninModal/>
            <SignupModal/>
            <TradeModal/>
        </>
    )
}