import "./book.card.a.skeletion.scss"
import { GiOpenBook } from "react-icons/gi"

export default function BookCardASkeletion(): JSX.Element {
    return (
        <div className="card-skeletion">
            <div className="card-skeletion-container">
                <div className="skeletion-image-container">
                    <div className="skeletion-image">
                        <GiOpenBook className="icon"/>
                    </div>
                </div>
                <div className="skeletion-attributes">
                    <div className="skeletion-title">
                    </div>
                    <div className="skeletion-author">
                    </div>
                    <div className="space"></div>
                    <div className="skeletion-button">
                    </div>
                </div>
            </div>
        </div>
    )
}