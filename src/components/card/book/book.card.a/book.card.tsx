import './book.card.scss'
import IBook from "../../../../models/book"
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai"
import BookImg from "../../../../assets/images/ic_book.png"


type bookCardAProps = {
    book: Partial<IBook>
}

export default function BookCardA(bookCardAProps: bookCardAProps): JSX.Element {

    const book = bookCardAProps.book

    return (
        <div className="book-card">
            <a href="" className="book-card-link">
                <div className="book-card-container">
                    <div className='favourite'>
                        <AiOutlineHeart className='unfilled-icon'/>
                    </div>
                    <div className='image-container'>
                        {book.images && book.images!.length > 0 ? <img src={book.images![0]} alt="image"/> : <img src={BookImg}></img>}
                    </div>
                    <div className='attributes'>
                        <span>{book.title}</span>
                        <span>{book.author}</span>
                        <div style={{flex: 1}}></div>
                        <button className='trade-button'>Trade</button>
                    </div>
                </div>
            </a>
        </div>
    )
}