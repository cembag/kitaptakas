import "./books.scss"
import { MdFilterAlt } from "react-icons/md"
import InputA from "../../components/input/input.a/input.a"
import { useState, useEffect } from "react"
import BookType, { bookTypes } from "../../context/book/book.types"
import { BookConditions, BookLegibilites } from "../../models/book"
import useToggle from "../../hooks/use.toggle"
import BookDal, { Custom } from "../../dal/book/book.dal"
import BookCardA from "../../components/card/book/book.card.a/book.card"
import { GiOpenBook } from "react-icons/gi"
import { Rings } from "react-loader-spinner"
import { BsCheck, BsFillTrashFill } from "react-icons/bs"
import { TiWarning } from "react-icons/ti"
import { RiQuestionFill } from "react-icons/ri"
import BookCardASkeletion from "../../components/card/book/book.card.a/book.card.a.skeletion"
import { useTypedSelector } from "../../provider/store"
import { FilterState } from "../../context/book/book.filter"
import bookWords from "../../context/book/book.words"

const numberOfPageOptions: Array<[string, string]> = [
    ["0", "100"],
    ["0", "200"],
    ["0", "500"],
    ["0", "1000"],
    ["0", "2000"],
    ["0", "5000"],
    ["0", "10000"],
    ["100", "200"],
    ["100", "500"],
    ["100", "1000"],
    ["100", "2000"],
    ["100", "5000"],
    ["100", "10000"],
    ["200", "500"],
    ["200", "1000"],
    ["200", "2000"],
    ["200", "5000"],
    ["200", "10000"],
    ["500", "1000"],
    ["500", "2000"],
    ["500", "5000"],
    ["500", "10000"],
    ["1000", "2000"],
    ["1000", "5000"],
    ["1000", "10000"],
    ["2000", "5000"],
    ["2000", "10000"],
    ["5000", "10000"]
]

const questions: Array<string> = [
    "Sistem nasıl işliyor?",
    "Kargo ücreti var mı?",
    "Teslimat süresi nedir?",
    "Kitap takas işlemi güvenli mi?",
]

export default function Books(): JSX.Element {

    const { value, toggle } = useToggle()
    const bookDal = new BookDal()

    const filtersInitialState: FilterState = {
        local: {
            for: "book",
            title: "",
        },
        client: {
            type: [],
            condition: "",
            legibility: "",
            has_missing_page: false,
            number_of_pages: {
                min: "",
                max: ""
            }
        }
    }
    const bookFetchingInitialState: Custom = {
        startAfter: undefined,
        filter: filtersInitialState,
        books: [],
        fetching: false,
        fetched: false
    }

    const [bookFetchingState, setBookFetchingState] = useState<Custom>(bookFetchingInitialState)
    const [filters, setFilters] = useState<FilterState>(filtersInitialState)

    const [category, setCategory] = useState<string>("")
    const [min, setMin] = useState<string>("")
    const [max, setMax] = useState<string>("")

    const [book, setBook] = useState<string>("")
    // const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    const { globalUser, language } = useTypedSelector(state => state)

    useEffect(() => {

        async function getBooks() {
            setBookFetchingState(prev => ({ ...prev, fetching: true }))
            const newFetchingState = await bookDal.getBooks(bookFetchingState)
            setBookFetchingState(newFetchingState)
        }

        getBooks()

    }, [value])

    useEffect(() => {

        setBookFetchingState(prev => ({ ...prev, filter: filters, startAfter: undefined, fetching: false, fetched: false}))

    }, [filters.client.condition, filters.client.has_missing_page, filters.client.legibility, filters.client.number_of_pages?.max, filters.client.number_of_pages?.min, filters.client.type.length])

    return (
        <div id="books" className="page">

            <button className="filter-button">
                <MdFilterAlt className="icon"/>
                <span>Show filters</span>
            </button>

            <section id="filter">
                <div className="filter-container">
                    <header id="filter-status">
                        <div className="filtered"></div>
                        
                    </header>

                    <div className="bottom">
                        <nav className="noselect">
                            <div id="filters" className="nav-item">
                                <div className="categories option-wrapper">
                                    <h2>Categories</h2>
                                    <header>
                                        <InputA placeHolder="Category" value={category} setState={setCategory} small={true} type={"search"} />
                                        <div className="space"></div>

                                        <div className="delete" onClick={() => setFilters(prev => ({ ...prev, client: { ...prev.client, type: [] } }))}>
                                            <BsFillTrashFill className="icon" />
                                        </div>
                                    </header>
                                    <div className="categories-container option-container with-scroll">

                                        {
                                            bookTypes.map((bookType, index) => {
                                                return (
                                                    <div key={index} className="option" style={{ display: bookType.toLowerCase().includes(category.toLowerCase()) ? "flex" : "none" }} onClick={() => setFilters(prev => {
                                                        let books: BookType[] = prev.client.type
                                                        if (books.includes(bookType)) {
                                                            const index = books.indexOf(bookType, 0);
                                                            books.splice(index, 1)
                                                        } else {
                                                            if (books.length < 10) {
                                                                books.push(bookType)
                                                            }
                                                        }
                                                        return { ...prev, client: { ...prev.client, type: books } }
                                                    })}>
                                                        <div className="checkbox" style={{ background: filters.client.type.includes(bookType) ? "var(--theme-color)" : "white", border: filters.client.type.includes(bookType) ? "2px solid var(--theme-color)" : "2px solid var(--border-color)" }}>
                                                            <BsCheck className="checkbox-icon" />
                                                        </div>
                                                        <span>{bookWords[language][bookType]}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="conditions option-wrapper">
                                    <h2>Condition</h2>
                                    <div className="conditions-container option-container">

                                        {
                                            BookConditions.map((bookCondition, index) => {
                                                return (
                                                    <div key={index} className="option" onClick={() => {
                                                        if(filters.client.condition === bookCondition) {
                                                            setFilters(prev => ({ ...prev, client: { ...prev.client, condition: "" } }))
                                                        } else {
                                                            setFilters(prev => ({ ...prev, client: { ...prev.client, condition: bookCondition } }))
                                                        }
                                                    }}>
                                                        <div className="checkbox" style={{ background: filters.client.condition.includes(bookCondition) ? "var(--theme-color)" : "white", border: filters.client.condition.includes(bookCondition) ? "2px solid var(--theme-color)" : "2px solid var(--border-color)" }}>
                                                            <BsCheck className="checkbox-icon" />
                                                        </div>
                                                        <span>{bookCondition}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="legibilities option-wrapper">
                                    <h2>Legibility</h2>
                                    <div className="legibilities-container option-container">

                                        {
                                            BookLegibilites.map((bookLegibility, index) => {
                                                return (
                                                    <div key={index} className="option" onClick={() => {
                                                        if(filters.client.legibility === bookLegibility) {
                                                            setFilters(prev => ({ ...prev, client: { ...prev.client, legibility: "" } }))
                                                        } else {
                                                            setFilters(prev => ({ ...prev, client: { ...prev.client, legibility: bookLegibility } }))
                                                        }
                                                        }}>
                                                        <div className="checkbox" style={{ background: filters.client.legibility.includes(bookLegibility) ? "var(--theme-color)" : "white", border: filters.client.legibility.includes(bookLegibility) ? "2px solid var(--theme-color)" : "2px solid var(--border-color)" }}>
                                                            <BsCheck className="checkbox-icon" />
                                                        </div>
                                                        <span>{bookLegibility}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="page-number option-wrapper">
                                    <h2>Number of pages</h2>
                                    <header>
                                        <InputA placeHolder="Min" value={min} setState={setMin} small={true} type={"number"} />
                                        <div className="seperator"></div>
                                        <InputA placeHolder="Max" value={max} setState={setMax} small={true} type={"number"} />
                                        <div className="delete" onClick={() => {
                                            setMin("")
                                            setMax("")
                                            setFilters(prev => ({
                                                ...prev, client: { ...prev.client, number_of_pages: { min: "", max: "" } }
                                            }))
                                        }}>
                                            <BsFillTrashFill className="icon" />
                                        </div>
                                    </header>
                                    <div className="page-number-container option-container with-scroll">
                                        {
                                            numberOfPageOptions.map((numberOfPageOption, index): JSX.Element => {

                                                const isSelected = min === numberOfPageOption[0] && max === numberOfPageOption[1]

                                                return (
                                                    <div key={index} className="option" onClick={() => {
                                                        setMin(numberOfPageOption[0])
                                                        setMax(numberOfPageOption[1])

                                                        setFilters(prev => ({
                                                            ...prev, client: { ...prev.client, number_of_pages: { min: numberOfPageOption[0], max: numberOfPageOption[1] } }
                                                        }))
                                                    }}>
                                                        <div className="checkbox" style={{ background: isSelected ? "var(--theme-color)" : "white", border: isSelected ? "2px solid var(--theme-color)" : "2px solid var(--border-color)" }}>
                                                            <BsCheck className="checkbox-icon" />
                                                        </div>
                                                        <span>{`${numberOfPageOption[0]} - ${numberOfPageOption[1]} page`}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="has-missing-page option-wrapper">
                                    <h2>Missing page</h2>
                                    <header onClick={() => setFilters(prev => ({ ...prev, client: { ...prev.client, has_missing_page: !prev.client.has_missing_page } }))}>
                                        <div className="checkbox">
                                            <div className="circle" style={{ scale: filters.client.has_missing_page ? "1" : "0" }} />
                                        </div>
                                        <span>Show books with missing pages</span>
                                    </header>
                                    <div className="warning">
                                        <TiWarning className="icon" />
                                        <span>When you activate this option, you will also see the books with missing pages.</span>
                                    </div>
                                </div>
                                <button className="apply-filters" onClick={() => {
                                        toggle()
                                        setBookFetchingState(prev => {
                                            if(!prev.startAfter) {
                                                return ({...prev, books: []})   
                                            } else {
                                                return prev
                                            }
                                        })
                                    }}>
                                    <span>Apply Filters</span>
                                </button>
                            </div>

                            <div id="sss" className="nav-item">
                                <h2>SSS</h2>
                                <a href="" className="questions">
                                    {
                                        questions.map((question, index): JSX.Element => {
                                            return (
                                                <div key={index} className="question">
                                                    <RiQuestionFill className="icon" />
                                                    <span>{question}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </a>
                            </div>


                        </nav>

                        <div className="right">
                            <div className="search-container">
                                <InputA placeHolder="Kitap ismi" value={book} setState={setBook} type={"search"}/>
                                <button className="search-button">Search</button>
                            </div>
                            
                            <div className="books">
                                <div className="books-wrapper">
                                    <div className="books-container">
                                        {
                                            bookFetchingState.books.length > 0 && bookFetchingState.books.map(book => {

                                                let isFavourite: boolean = false

                                                if (globalUser && globalUser.favourites.includes(book.id)) {
                                                    isFavourite = true
                                                }

                                                return (
                                                    <BookCardA book={book} isFavourite={isFavourite} />
                                                )
                                            })
                                        }

                                        {
                                            bookFetchingState.fetching && (
                                                <>
                                                    <BookCardASkeletion />
                                                    <BookCardASkeletion />
                                                    <BookCardASkeletion />
                                                    <BookCardASkeletion />
                                                    <BookCardASkeletion />
                                                    <BookCardASkeletion />
                                                    <BookCardASkeletion />
                                                    <BookCardASkeletion />
                                                    <BookCardASkeletion />
                                                    <BookCardASkeletion />
                                                </>
                                            )
                                        }
                                    </div>
                                    <button className="see-more-button" onClick={() => {
                                        if (!bookFetchingState.fetching && !bookFetchingState.fetched) {
                                            toggle()
                                        }
                                    }}>
                                        {
                                            !bookFetchingState.fetching ? (
                                                <>
                                                    <GiOpenBook className="book-icon" />
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
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}