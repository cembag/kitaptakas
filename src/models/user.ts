export default interface IUser {
    id: string
    name: string
    surname: string
    age: number
    birth_date: Date
    bio: string
    pic_url: string
    books?: string[]
}