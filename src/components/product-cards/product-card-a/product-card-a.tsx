import './product-card-a.scss'
import React from 'react'
import IProduct from '../../../models/ignore/product'

type ProductCardAProps = {
    product: IProduct
}

export default function ProductCardA(productCardAProps: ProductCardAProps): JSX.Element {

    const product = productCardAProps.product

    function changeInnerHTML(event: React.MouseEvent<HTMLDivElement, MouseEvent>, text: string) {
        event.stopPropagation()
        event.currentTarget.innerHTML = text
    }

    return (
        <div className="product_card_a">
            <div className={`product ${product.badge} column all-center`}>
                <div className="badge">{product.badge}</div>
                <div className="image_wrapper">
                    <img className="product_image" src={product.image} alt={product.name}/>
                </div>
                <div className="buy_button" onMouseOver={(event) => changeInnerHTML(event, "Buy now")} onMouseLeave={(event) => changeInnerHTML(event, String(product.price))}>{product.price}</div>
            </div>
        </div>
    )
}