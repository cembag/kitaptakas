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

    public showTime(date: Date) {
        const getDateDiffByDayFromSec = (t2: number) => {
            const t1 = new Date().getTime() / 1000;
            return Math.abs(Math.floor((t1 - t2) / (60 * 60 * 24)));
        };
    
        const padL = (nr: number, len = 2, chr = `0`) => `${nr}`.padStart(len, chr);
        const diffByDay = Math.abs(getDateDiffByDayFromSec(date.getTime() / 1000));
    
        if (diffByDay < 7) {
            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            switch (diffByDay) {
                case 0:
                    return `${padL(date.getHours())}.${padL(date.getMinutes())}`;
                case 1:
                    return "Yesterday";
                default:
                    const today = date.getDay();
                    if (today < diffByDay) {
                        return days[days.length - Math.abs(today - diffByDay)];
                    } else {
                        return days[today - diffByDay];
                    }
            }
        } else if (diffByDay < 365) {
            const months = [
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
            ];
            return `${months[date.getMonth()].substring(0, 3)} ${date.getDate()}`;
        } else {
            return `${padL(date.getMonth() + 1)}.${padL(date.getDate())}.${date.getFullYear()}`;
        }
    }
}