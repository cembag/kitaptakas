import "./filter.book.scss"
import { MdKeyboardArrowDown } from "react-icons/md"
import InputA from "../../components/input/input.a/input.a"
import { useState, useEffect } from "react"
import bookTypes, { BookTypes } from "../../context/book/book.types"
import { BookCondition, BookConditions, BookLegibility, BookLegibilites } from "../../models/book"
import useToggle from "../../hooks/use.toggle"
import BookDal, { Custom } from "../../dal/book/book.dal"
import BookCardA from "../../components/card/book/book.card.a/book.card"
import { GiOpenBook } from "react-icons/gi"
import { Rings } from "react-loader-spinner"
import { BsCheck, BsFillTrashFill } from "react-icons/bs"
import { TiWarning } from "react-icons/ti"
import { RiQuestionFill } from "react-icons/ri"
import BookCardASkeletion from "../../components/card/book/book.card.a/book.card.a.skeletion"


type FilterFor = typeof localFor[number]

const localFor = [
    "book",
    "author"
] as const

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

type FilterState = {
    local: {
        for: FilterFor,
        title: string,
    },
    client: {
        type: BookTypes[],
        condition: BookCondition[],
        legibility: BookLegibility[],
        number_of_pages?: number,
        has_missing_page?: boolean
    }
}

export default function FilterBook(): JSX.Element {

    const { value, toggle } = useToggle()
    const bookDal = new BookDal()
    
    const filtersInitialState: FilterState = {
        local: {
            for: "book",
            title: "",
        },
        client: {
            type: [],
            condition: [],
            legibility: [],
            has_missing_page: false,
        }
    }
    const bookFetchingInitialState: Custom = {
        startAfter: undefined,
        books: [],
        fetching: false,
        fetched: false
    }

    const [bookFetchingState, setBookFetchingState] = useState<Custom>(bookFetchingInitialState)
    const [filters, setFilters] = useState<FilterState>(filtersInitialState)

    const [category, setCategory] = useState<string>("")
    const [min, setMin] = useState<string>("")
    const [max, setMax] = useState<string>("")
    
    // const [book, setBook] = useState<string>("")
    // const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    

    useEffect(() => {

        async function getBooks() {
            setBookFetchingState(prev => ({ ...prev, fetching: true }))
            const newFetchingState = await bookDal.getBooks(bookFetchingState)
            setBookFetchingState(newFetchingState)
        }

        getBooks()

    }, [value])

    return (
        <div id="filter-book" className="page">
            <section id="filter">
                <div className="filter-container">
                    {/* <header>
                        <div className="filtered"></div>
                        <div className="search-container">
                            <div className="for-options" onClick={() => setIsDropdownOpen(prev => !prev)}>
                                <div className="options-container" style={{ height: isDropdownOpen ? "72px" : "0px", opacity: isDropdownOpen ? "1" : "0" }}>
                                    {
                                        localFor.map((localFor, index) => {
                                            return (
                                                <div key={index} className="option" onClick={() => setFilters(prev => ({ ...prev, local: { ...prev.local, for: localFor } }))}>
                                                    <span>{localFor}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <span className="selected">{"For " + filters.local.for}</span>
                                <MdKeyboardArrowDown className="arrow-icon" />
                            </div>

                            <InputA placeHolder="Kitap ismi" value={book} setState={setBook} type={"search"}/>
                            <button className="search-button">Ara</button>
                        </div>
                    </header> */}

                    <div className="bottom">
                        <nav className="noselect">
                            <div id="filters" className="nav-item">
                                <div className="categories option-wrapper">
                                    <h2>Categories</h2>
                                    <header>
                                        <InputA placeHolder="Category" value={category} setState={setCategory} small={true} type={"search"}/>
                                        <div className="space"></div>
                                        
                                        <div className="delete" onClick={() => setFilters(prev => ({...prev, client: {...prev.client, type: []}}))}>
                                            <BsFillTrashFill className="icon"/> 
                                        </div>
                                    </header>
                                    <div className="categories-container option-container with-scroll">
                                    
                                        <div className="option" onClick={() => {
                                            if(filters.client.type.length === bookTypes.length) {
                                                setFilters(prev => ({...prev, client: {...prev.client, type: []}}))
                                            } else {
                                                setFilters(prev => ({...prev, client: {...prev.client, type: [...bookTypes]}}))
                                            }
                                        }}>
                                            <div className="checkbox" style={{ background: filters.client.type.length === bookTypes.length ? "var(--theme-color)" : "white", border: filters.client.type.length === bookTypes.length ? "2px solid var(--theme-color)" : "2px solid var(--border-color)" }}>
                                                <BsCheck className="checkbox-icon" />
                                            </div>
                                            <span>All</span>
                                        </div>
                                        
                                        {
                                            bookTypes.map((bookType, index) => {
                                                return (
                                                    <div key={index} className="option" style={{display: bookType.toLowerCase().includes(category.toLowerCase()) ? "flex" : "none"}} onClick={() => setFilters(prev => {
                                                        let books: BookTypes[] = prev.client.type
                                                        if(prev.client.type.includes(bookType)) {
                                                            const index = books.indexOf(bookType, 0);
                                                            books.splice(index, 1)
                                                        } else {
                                                            books.push(bookType)
                                                        }
                                                        return {...prev, client: {...prev.client, type: books}}
                                                    })}>
                                                        <div className="checkbox" style={{ background: filters.client.type.includes(bookType) ? "var(--theme-color)" : "white", border: filters.client.type.includes(bookType) ? "2px solid var(--theme-color)" : "2px solid var(--border-color)" }}>
                                                            <BsCheck className="checkbox-icon" />
                                                        </div>
                                                        <span>{bookType}</span>
                                                    </div>
                                                )
                                            })   
                                        }
                                    </div>
                                </div>
                                <div className="conditions option-wrapper">
                                    <h2>Condition</h2>
                                    <div className="conditions-container option-container">
                                          
                                        <div className="option" onClick={() => {
                                            if(filters.client.condition.length === BookConditions.length) {
                                                setFilters(prev => ({...prev, client: {...prev.client, condition: []}}))
                                            } else {
                                                setFilters(prev => ({...prev, client: {...prev.client, condition: [...BookConditions]}}))
                                            }
                                        }}>
                                            <div className="checkbox" style={{ background: filters.client.condition.length === BookConditions.length ? "var(--theme-color)" : "white", border: filters.client.condition.length === BookConditions.length ? "2px solid var(--theme-color)" : "2px solid var(--border-color)" }}>
                                                <BsCheck className="checkbox-icon" />
                                            </div>
                                            <span>All</span>
                                        </div>
                                        
                                    
                                        {
                                            BookConditions.map((bookCondition, index) => {
                                                return (
                                                    <div key={index} className="option" onClick={() => setFilters(prev => {
                                                        let conditions: BookCondition[] = prev.client.condition
                                                        if(prev.client.condition.includes(bookCondition)) {
                                                            const index = conditions.indexOf(bookCondition, 0);
                                                            conditions.splice(index, 1)
                                                        } else {
                                                            conditions.push(bookCondition)
                                                        }
                                                        return {...prev, client: {...prev.client, condition: conditions}}
                                                    })}>
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
                                    
                                        <div className="option" onClick={() => {
                                            if(filters.client.legibility.length === BookLegibilites.length) {
                                                setFilters(prev => ({...prev, client: {...prev.client, legibility: []}}))
                                            } else {
                                                setFilters(prev => ({...prev, client: {...prev.client, legibility: [...BookLegibilites]}}))
                                            }
                                        }}>
                                            <div className="checkbox" style={{ background: filters.client.legibility.length === BookLegibilites.length ? "var(--theme-color)" : "white", border: filters.client.legibility.length === BookLegibilites.length ? "2px solid var(--theme-color)" : "2px solid var(--border-color)" }}>
                                                <BsCheck className="checkbox-icon" />
                                            </div>
                                            <span>All</span>
                                        </div>
                                    
                                        {
                                            BookLegibilites.map((bookLegibility, index) => {
                                                return (
                                                    <div key={index} className="option" onClick={() => setFilters(prev => {
                                                        let legibilities: BookLegibility[] = prev.client.legibility
                                                        if(prev.client.legibility.includes(bookLegibility)) {
                                                            const index = legibilities.indexOf(bookLegibility, 0);
                                                            legibilities.splice(index, 1)
                                                        } else {
                                                            legibilities.push(bookLegibility)
                                                        }
                                                        return {...prev, client: {...prev.client, legibility: legibilities}}
                                                    })}>
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
                                        <InputA placeHolder="Min" value={min} setState={setMin} small={true} type={"number"}/>
                                        <div className="seperator"></div>
                                        <InputA placeHolder="Max" value={max} setState={setMax} small={true} type={"number"}/>
                                        <div className="delete" onClick={() => {
                                            setMin("")
                                            setMax("")
                                        }}>
                                            <BsFillTrashFill className="icon"/> 
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
                                    <header onClick={() => setFilters(prev => ({...prev, client: {...prev.client, has_missing_page: !prev.client.has_missing_page}}))}>
                                        <div className="checkbox">
                                            <div className="circle" style={{scale: filters.client.has_missing_page ? "1" : "0"}}/>
                                        </div>
                                        <span>Show books with missing pages</span>
                                    </header>
                                    <div className="warning">
                                        <TiWarning className="icon"/>
                                        <span>When you activate this option, you will also see the books with missing pages.</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="sss" className="nav-item">
                                <h2>SSS</h2>
                                <a href="" className="questions">
                                    {
                                        questions.map((question, index): JSX.Element => {
                                            return (
                                                <div key={index} className="question">
                                                    <RiQuestionFill className="icon"/>
                                                    <span>{question}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </a>
                            </div>
                            
                            
                        </nav>
                        <div className="books">
                            <div className="books-wrapper">
                                <div className="books-container">
                                    {
                                        bookFetchingState.books.length > 0 && bookFetchingState.books.map(book => {
                                            return (
                                                <BookCardA book={book} />
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
            </section>
        </div>
    )
}