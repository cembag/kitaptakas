import firebase from "firebase"

export default interface ICoupon {
    id: string
    discount_percent: number
    expiration_date: firebase.firestore.Timestamp
}