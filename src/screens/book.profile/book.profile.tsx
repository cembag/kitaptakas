import "./book.profile.scss"
import { useEffect, useState } from "react"
import BookDal from "../../dal/book/book.dal"
import IBook from "../../models/book"
import { RiUserFill } from "react-icons/ri" 
import { useAppDispatch, useTypedSelector } from "../../provider/store"
import DateService from "../../services/date/date.service"
import { FcOvertime } from "react-icons/fc"
import { HiOutlineHeart } from "react-icons/hi"
import FavouriteDal from "../../dal/favourite/favourite.dal"
import { rDb } from "../../config/firebase"
import useListenUserFavourites from "../../hooks/use.listen.user.favourites"
import useListenBookFavourites from "../../hooks/use.listen.book.favourites"
import BookCardA from "../../components/card/book/book.card.a/book.card"
import { setTradeModal } from "../../provider/modals/modals.reducer"

const heartScale = [
    { transform: " scale(.2)" },
    { transform: " scale(1.1)" },
    { transform: " scale(.95)" },
    { transform: " scale(1)" },
];

const heartTiming = {
    duration: 400,
    iterations: 1,
};

export default function BookProfile(): JSX.Element {

    const dispatch = useAppDispatch()
    const favouriteDal = new FavouriteDal()
    const dateService = new DateService()
    const [book, setBook] = useState<IBook | undefined>()
    const bookDal = new BookDal()
    const { language, globalUser } = useTypedSelector(state => state)
    const bookFavouriteData = useListenBookFavourites(book && book.id)

    useListenUserFavourites()

    useEffect(() => {

        const path = window.location.pathname
        const bookId = path.substring((path.indexOf("book/") + 5), path.length)

        bookDal.getBook(bookId).then(book => setBook(book))

    }, [window.location.pathname])

    useEffect(() => {
        if (book && globalUser) {
            const bookPage = document.getElementById("book")

            if (bookPage) {

                const heartIcon = bookPage.querySelector(".heart-icon")

                if (heartIcon) {
                    if (globalUser.favourites.includes(book.id)) {
                        heartIcon.setAttribute("fill", "var(--theme-color)")
                        heartIcon.animate(heartScale, heartTiming)
                    } else {
                        heartIcon.setAttribute("fill", "white")
                    }
                }
            }
        }

    }, [book && globalUser && globalUser.favourites.length])

    useEffect(() => {
        console.log(bookFavouriteData.count)
    }, [bookFavouriteData.count])

    return (
        <div id="book-page" className="page">

            {
                book && (
                    <section id="book">
                        <div className="book-container" onClick={async () => {
                            const favourites = (await rDb.ref("users/" + globalUser.user!.id + "/favourites").get()).val()
                            console.log(favourites)
                        }}>
                            <figure>
                                {book.images && book.images.length > 0 && <img src={book.images[0]} alt="" />}
                                {!book.images || book.images.length === 0 && <img src={require("../../assets/images/ic_book.png")} alt="" />}
                            </figure>
                            <div className="book">
                                <header>
                                    <h2>{book.title.toUpperCase()}</h2>
                                    <h3>{book.author}</h3>
                                    <div className="row ai-center">
                                        <div className="date attribute">
                                            <FcOvertime className="date-icon icon" />
                                            <span>{dateService.getDayAndMonthFromDate(dateService.getDateFromFirestore(book.created_at), language)}</span>
                                            {/* <span>{dateService.showTime(dateService.getDateFromFirestore(book.created_at))}</span> */}
                                        </div>

                                        <div className="favourites attribute">
                                            <HiOutlineHeart className="heart-icon icon" onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();

                                                if (globalUser && globalUser.favourites.includes(book.id)) {
                                                    favouriteDal.delete(book.id)
                                                } else {
                                                    favouriteDal.add(book.id)
                                                }
                                            }} style={{ color: globalUser && globalUser.favourites.includes(book.id) ? "var(--theme-color)" : "#78909C" }} />
                                            <span>{bookFavouriteData.count}</span>
                                            <div className="">

                                            </div>
                                        </div>
                                    </div>
                                </header>

                                <div className="attributes-wrapper">
                                    <div className="attributes-container">
                                        <div className="attribute">
                                            <span className="name">Ürün kodu</span>
                                            <span className="value">3CUfi3</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Kategori</span>
                                            <span className="value">Masal</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Dil</span>
                                            <span className="value">Türkçe</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Sayfa sayısı</span>
                                            <span className="value">125</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Yayıncı</span>
                                            <span className="value">Yayınevleri</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Okunabilirlik</span>
                                            <span className="value">Okunur</span>
                                        </div>
                                        <div className="attribute">
                                            <span className="name">Durum</span>
                                            <span className="value">İyi</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space"></div>

                                <div className="buttons">
                                    <button className="trade-button" onClick={() => dispatch(setTradeModal(book.id))}>
                                        Trade
                                    </button>
                                    <button className="profile-button">
                                        See profile
                                    </button>
                                </div>
                            </div>
                            <div className="owner-wrapper">

                                <header className="container">
                                    <span className="name">Cem Hakkı Bağ</span>
                                    <span className="trades">2000 <b>işlem</b></span>
                                </header>

                                <div className="bio container">
                                    <span>Kitap Gemisi tüm Türkiye'ye Sendeo Kargo & NadirKitap anlaşması ile gönderim yapmaktadır;
                                        Tek kitap kargo ücreti: 24.00 TL(KDV dahil)
                                        2 ve daha fazla kitap:  26.00 TL (Adet limiti olmaksızın, KDV dahil)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }

            <section id="recommended">
                <div className="recommended-container">
                    <h2>Recommended for you</h2>
                    <div className="books">
                        {
                            book && (
                                <>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                <BookCardA book={book} isFavourite={false}/>
                                </>
                            )
                        }
                    </div>
                </div>
            </section>

        </div>
    )
}


