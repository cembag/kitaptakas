import firebase from "firebase"
export type TradeStatus = "pending" | "accepted" | "rejected" | "cancelled"

export default interface ITrade {
    id: string
    alan_kisi: string
    gonderen_kisi: string
    istenilen_kitap: {
        id: string,
        title: string,
        author: string,
        img: string
    }
    teklif_edilen_kitap: {
        id: string,
        title: string,
        author: string,
        img: string
    }
    status: TradeStatus
    created_at: firebase.firestore.Timestamp
}