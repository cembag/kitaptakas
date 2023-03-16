export type LanguageType = {
    en: "en",
    tr: "tr",
    he: "he"
}

export const languages: {[key in keyof LanguageType]: string} = {
    en: "English",
    tr: "Türkçe",
    he: "עִברִית",
}

export default interface ILanguage {
    language: keyof LanguageType
}
