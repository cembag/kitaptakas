import { LanguageType } from "../../context/language/supported.languages"

function getBrowserLanguage(): LanguageType {
    let language: LanguageType = "en"
    const browserLanguage = navigator.language.split("-")[0] as LanguageType
    if(typeof browserLanguage === typeof language) {
        language = browserLanguage
    }

    return language
}

const initialStateLanguage: LanguageType = getBrowserLanguage()
export default initialStateLanguage