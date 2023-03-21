import FixedLengthArray from "../../utils/fixed.length.array";
import { LanguageType } from "../language/supported.languages";

const monthsWord: {[key in LanguageType]: FixedLengthArray<12, string>} = {
    en: [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July",
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ] as const,
    tr: [
        "Ocak", 
        "Şubat", 
        "Mart", 
        "Nisan", 
        "Mayıs", 
        "Haziran", 
        "Temmuz",
        "Ağustos", 
        "Eylül", 
        "Ekim", 
        "Kasım", 
        "Aralık"
    ] as const
};

export default monthsWord