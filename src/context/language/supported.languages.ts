export type LanguageType = typeof supportedLanguages[number]

const supportedLanguages = [
    "tr",
    "en"
] as const 

export default supportedLanguages