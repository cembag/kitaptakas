import { LanguageType } from "../context/language/supported.languages";

type WordType = typeof words[number]

const words = [
    "find_book",
    "login",
    "signup",
] as const

const languages: {[key in LanguageType]: {
    [key in WordType]: string
}} = {
    en: {
        find_book: "Find book",
        login: "Login",
        signup: "Sign up",
    },
    tr: {
        find_book: "Aradığınız kitabı bulun",
        login: "Giriş yap",
        signup: "Kayıt ol",
    },
}

export default languages