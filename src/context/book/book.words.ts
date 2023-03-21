import { LanguageType } from "../language/supported.languages";
import { BookType } from "./book.types";

const bookWords: {[key in LanguageType]: {
    [key in BookType]: string
}} = {
    tr: {
        Romance: "Roman",
        Poem: "Şiir",
        Essay: "Deneme",
        "Self Improvement": "Kişisel Gelişim",
        Health: "Sağlık",
        Philosophy: "Felsefe",
        Autobiography: "Otobiyografi",
        Sports: "Spor",
        History: "Tarih",
        Politics: "Politika",
        Biography: "Biyografi",
        Children: "Çocuk",
        Lesson: "Ders",
        Psychology: "Psikoloji",
        Computer: "Bilgisayar",
        Science: "Bilim",
        Classics: "Klasik",
        Cook: "Yemek",
        Culture: "Kültür",
    },
    en: {
        Romance: "Romance",
        Poem: "Poem",
        Essay: "Essay",
        "Self Improvement": "Self Improvement",
        Health: "Health",
        Philosophy: "Philosophy",
        Autobiography: "Autobiography",
        Sports: "Sports",
        History: "History",
        Politics: "Politics",
        Biography: "Biography",
        Children: "Children",
        Lesson: "Lesson",
        Psychology: "Psychology",
        Computer: "Computer",
        Science: "Science",
        Classics: "Classics",
        Cook: "Cook",
        Culture: "Culture",
    },
}

export default bookWords