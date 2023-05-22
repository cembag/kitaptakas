import firebase from "firebase/app"
import monthsWord from "../../context/date/month"
import { LanguageType } from "../../context/language/supported.languages"

export default class DateService {
    public getDateFromFirestore(timestamp: firebase.firestore.Timestamp): Date {
        return timestamp.toDate()
    }

    public getDayAndMonthFromDate(date: Date, language: LanguageType): string {
        return date.getDate() + " " + monthsWord[language][date.getMonth() + 1]
    }
}