import './book.card.scss'
import { useState } from "react"
import IBook from "../../../../models/book"
import {HiOutlineHeart} from "react-icons/hi"
import BookImg from "../../../../assets/images/ic_book.png"
import FavouriteDal from '../../../../dal/favourite/favourite.dal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setTradeModal } from '../../../../provider/modals/modals.reducer'


type bookCardAProps = {
    book: Partial<IBook>,
    isFavourite: boolean,
}

export default function BookCardA(bookCardAProps: bookCardAProps): JSX.Element {

    const {book, isFavourite} = bookCardAProps
    const favouriteDal = new FavouriteDal()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [inProcess, setInProcess] = useState<boolean>(false)

    return (
        <div id={"book" + book.id} className="book-card" onClick={() => navigate("/book/" + book.id)}>
            <a className="book-card-link">
                <div className="book-card-container"  >
                    <div className='favourite' onClick={async (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        
                        if(book.id && !inProcess) {
                            setInProcess(true)
                            if(isFavourite) {
                                await favouriteDal.delete(book.id)
                            } else {
                                await favouriteDal.add(book.id)
                            }
                            setInProcess(false)
                        }
                    }}>
                    <HiOutlineHeart className='heart-icon' style={{color: isFavourite ? "var(--theme-color)" : "var(--color-black-smooth)", fill: isFavourite ? "var(--theme-color)" : "white"}}/>
                    
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

                            dispatch(setTradeModal(book.id!))
                        }}>Trade</button>
                    </div>
                </div>
            </a>
        </div>
    )
}