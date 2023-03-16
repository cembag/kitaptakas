import { useTypedSelector } from "../provider/store";
import languages from "./languages";

export default function useTranslation() {

    const language = useTypedSelector(state => state.language)

    return languages[language]
}