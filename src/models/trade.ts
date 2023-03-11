import firebase from "firebase"
export type TradeStatus = "pending" | "accepted" | "rejected" | "cancelled"

export default interface ITrade {
    id: string
    alinan: string
    verilen: string
    status: TradeStatus
    created_at: firebase.firestore.Timestamp
}