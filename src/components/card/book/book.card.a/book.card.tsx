import './book.card.scss'
import IBook from "../../../../models/book"
import {HiOutlineHeart} from "react-icons/hi"
import BookImg from "../../../../assets/images/ic_book.png"
import FavouriteDal from '../../../../dal/favourite/favourite.dal'
import useHeartAnimation from '../../../../common/use.heart.animation'
import { useNavigate } from 'react-router-dom'


type bookCardAProps = {
    book: Partial<IBook>,
    isFavourite: boolean,
}

export default function BookCardA(bookCardAProps: bookCardAProps): JSX.Element {

    const {book, isFavourite} = bookCardAProps
    const favouriteDal = new FavouriteDal()
    useHeartAnimation("book" + book.id, isFavourite)
    const navigate = useNavigate()

    return (
        <div id={"book" + book.id} className="book-card" onClick={() => navigate("/book/" + book.id)}>
            <a className="book-card-link">
                <div className="book-card-container"  >
                    <div className='favourite' onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        
                        if(book.id) {
                            console.log(isFavourite)
                        
                            if(isFavourite) {
                                favouriteDal.delete(book.id)
                            } else {
                                favouriteDal.add(book.id)
                            }
                        }
                    }}>
                    <HiOutlineHeart className='heart-icon'/>
                    
                    </div>
                    <div className='image-container'>
                        {book.images && book.images!.length > 0 ? <img src={book.images![0]} alt="image"/> : <img src={BookImg}></img>}
                    </div>
                    <div className='attributes'>
                        <span>{book.title}</span>
                        <span>{book.author}</span>
                        <div style={{flex: 1}}></div>
                        <button className='trade-button' onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}>Trade</button>
                    </div>
                </div>
            </a>
        </div>
    )
}