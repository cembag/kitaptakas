import ILanguage, {LanguageType} from "../../models/language";


function getBrowserLanguage(): keyof LanguageType {
    let language: keyof LanguageType = "en"
    const browserLanguage = navigator.language.split("-")[0] as keyof LanguageType
    if(typeof browserLanguage === typeof language) {
        language = browserLanguage
    }

    return language
}

const initialStateLanguage: ILanguage = {
    language: getBrowserLanguage()
}

export default initialStateLanguage