import "./home.scss"
import { useEffect, useState } from "react"
import { GiOpenBook } from "react-icons/gi"
import bookTypes from "../../context/book/book.types"
import BookCardA from "../../components/card/book/book.card.a/book.card"
import { useNavigate } from "react-router-dom"
import BookDal, { Custom } from "../../dal/book/book.dal"
import useToggle from "../../hooks/use.toggle"
import { Bars, Rings } from "react-loader-spinner"
import useTranslation from "../../translation/use.translation"
import BookCardASkeletion from "../../components/card/book/book.card.a/book.card.a.skeletion"
import { useTypedSelector } from "../../provider/store"
import bookWords from "../../context/book/book.words"

export default function Home(): JSX.Element {

    const translation = useTranslation()
    const navigate = useNavigate()
    const {value, toggle} = useToggle()
    const bookDal = new BookDal()

    const [bookFetchingState, setBookFetchingState] = useState<Custom>({
        startAfter: undefined,
        filter: undefined,
        books: [],
        fetching: false,
        fetched: false
    })
    
    const [searchInputState, setSearchInputState] = useState<{
        value: string,
        isFocused: boolean
    }>({
        value: "",
        isFocused: false
    })

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInputState(prev => ({...prev, value: e.target.value}))
    const {user, language} = useTypedSelector(state => state)

    useEffect(() => {

        async function getBooks() {
            setBookFetchingState(prev => ({...prev, fetching: true}))
            const newFetchingState = await bookDal.getBooks(bookFetchingState)
            setBookFetchingState(newFetchingState)
        }

        getBooks()

    }, [value])

    return (
        <div id="home" className="page">

            <section id="banner">
                <div className="image-container">
                    <div className="image-overlay"></div>
                    <div className="image"></div>
                </div>
                <div className="img-wrapper">
                    <div className="img-container"></div>
                </div>
                <div className="finder">
                    <h2>{translation.find_book}</h2>
                    <div className="finder-options">
                        <a href="#books" className="books option">
                            <GiOpenBook className="book-icon"/>
                        </a>
                        <div className="search option">
                            <span className="search-placeholder" style={{fontSize: searchInputState.isFocused || searchInputState.value ? "12px" : "15px", top: searchInputState.isFocused || searchInputState.value ? "7px" : "15px", color: searchInputState.isFocused || searchInputState.value ? "var(--theme-color)" : "rgb(180, 180, 180)"}}>Kitap ismi giriniz</span>
                            <input type="text" onChange={handleSearchInput} value={searchInputState.value} onFocus={() => setSearchInputState(prev => ({...prev, isFocused: true}))} onBlur={() => setSearchInputState(prev => ({...prev, isFocused: false}))}/>
                        </div>
                    </div>
                    <button onClick={() => navigate("/filter_book")}>Kitap ismine göre arayın</button>
                </div>
            </section>

            <section id="categories">
                <div className="categories-wrapper">
                    <h2>Categories</h2>
                    <div className="categories-container">
                        {
                            bookTypes.map((bookType, index) => {
                                return (
                                    <a href="" key={index} className="category noselect">
                                        <div data-testid="link" className="category-wrapper">
                                            <a className="category-link">
                                                <figure className="image-wrapper">

                                                </figure>
                                                <span className="category-type">{bookWords[language][bookType]}</span>
                                            </a>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

            <section id="books">
                <div className="books-wrapper">
                    <h2>Books</h2>
                    <div className="books-container">
                        {
                            bookFetchingState.books.length > 0 && bookFetchingState.books.map(book => {
                            
                                let isFavourite: boolean = false
                                
                                if(user && user.favourites && user.favourites.length > 0 && user.favourites.includes(book.id)) {
                                    isFavourite = true
                                }
                            
                                return (
                                    <BookCardA book={book} isFavourite={isFavourite}/>
                                )
                            })
                        }
                        
                        {
                               bookFetchingState.fetching && (
                                <>
                                    <BookCardASkeletion/>
                                    <BookCardASkeletion/>
                                    <BookCardASkeletion/>
                                    <BookCardASkeletion/>
                                    <BookCardASkeletion/>
                                    <BookCardASkeletion/>
                                    <BookCardASkeletion/>
                                    <BookCardASkeletion/>
                                    <BookCardASkeletion/>
                                    <BookCardASkeletion/>
                                </>
                            )
                        }
                    </div>
                    <button className="see-more-button" onClick={() => {
                        if(!bookFetchingState.fetching && !bookFetchingState.fetched) {
                            toggle()
                        }
                    }}>
                        {
                            !bookFetchingState.fetching ? (
                                <>
                                    <GiOpenBook className="book-icon"/>
                                    <span>{bookFetchingState.fetched ? "You have seen all the books" : "See more"}</span>
                                </>
                            ) : (
                                <Rings
                                    height="50"
                                    width="50"
                                    color="var(--theme-color)"
                                    radius="8"
                                    wrapperStyle={{}}
                                    wrapperClass="loader"
                                    visible={true}
                                    ariaLabel="rings-loading"
                                />
                            )
                        }
                    </button>
                </div>
            </section>
                
        </div>
    )
}