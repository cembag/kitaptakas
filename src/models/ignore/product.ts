export type ProductType = "character" | "stylish"
export type ProductBadgeType = "special" | "rare" | "common"

export default interface IProduct {
    id: string
    image: string
    name: string
    price: number
    description: string
    type: ProductType
    badge: ProductBadgeType
}

