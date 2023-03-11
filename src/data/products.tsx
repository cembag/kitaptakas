import IProduct from "../models/product"

const products: IProduct[] = [
    {
        id: "A5S6E22",
        image: "https://mito3d.fra1.digitaloceanspaces.com/3Dprintmodels/thangs/batman_arkham_support_free_remix_3d_model_thangs",
        name: "Batman",
        price: 29.99,
        description: "Movie character",
        type: "character",
        badge: "rare"
    },
    {
        id: "A536ED2",
        image: "https://www.nic-e.shop/wp-content/uploads/2020/10/tesla_model_y.png",
        name: "Tesla",
        price: 59.99,
        description: "A car ..",
        type: "stylish",
        badge: "special"
    },
    {
        id: "H220PPL",
        image: "https://thangs.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fthangs-thumbnails%2Fproduction%2F74d9753b-1ada-4ec4-b298-adb60a39b92a%2Fporta_lapices_umbrella.png&w=3840&q=75",
        name: "Pencil box",
        price: 89.99,
        description: "A stylish usefull item",
        type: "stylish",
        badge: "common"
    }
]

export default products