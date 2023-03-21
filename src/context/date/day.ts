import FixedLengthArray from "../../utils/fixed.length.array";
import { LanguageType } from "../language/supported.languages";

const daysWord: {[key in LanguageType]: FixedLengthArray<7, string>} = {
    en: [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ] as const,
    tr: [
        "Pazartesi", 
        "Salı", 
        "Çarşamba", 
        "Perşembe", 
        "Cuma", 
        "Cumartesi", 
        "Pazar",
    ] as const
};

export default daysWord