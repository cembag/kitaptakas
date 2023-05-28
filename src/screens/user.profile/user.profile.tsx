import "./user.profile.scss"
import firebase from "firebase/app";
import { ReactComponent as FavouriteImg } from "../../assets/images/favourite.svg"
import { ReactComponent as BookImgg } from "../../assets/images/book.svg"
import { ReactComponent as DealImg } from "../../assets/images/deal.svg"
import { CgClose } from "react-icons/cg"
import BookImg from "../../assets/images/ic_book.png"
import { useCallback, useContext, useEffect, useState } from "react";
import cities from "../../context/city/cities";
import { RiImageAddLine, RiUserFill } from "react-icons/ri";
import { IconType } from "react-icons";
import { GiOpenBook } from "react-icons/gi";
import { MdLocalOffer, MdOutlineClose } from "react-icons/md";
import { HiHeart } from "react-icons/hi";
import { FirebaseAuthContext } from "../../hooks/auth.provider";
import bookImg from "../../assets/images/ic_book.png"
import BookCardA from "../../components/card/book/book.card.a/book.card";
import FavouriteDal, { CustomFavourite } from "../../dal/favourite/favourite.dal";
import useToggle from "../../hooks/use.toggle";
import BookCardASkeletion from "../../components/card/book/book.card.a/book.card.a.skeletion";
import { useAppDispatch } from "../../provider/store";
import { setAddBookModal } from "../../provider/modals/modals.reducer";
import { useLocation, useNavigate } from "react-router-dom";
import IBook from "../../models/book";
import dbModel from "../../utils/db.model";
import ITrade from "../../models/trade";
import { BsCheckLg } from "react-icons/bs";


const headers: { name: string, icon: IconType }[] = [
    {
        name: "My Profile",
        icon: RiUserFill
    },
    {
        name: "My Books",
        icon: GiOpenBook
    },
    {
        name: "My Offers",
        icon: MdLocalOffer
    },
    {
        name: "My favourites",
        icon: HiHeart
    },
]

type UserProfile = {
    name: string,
    surname: string,
    photoUrl: string,
    phoneNumber: string,
    email: string,
    password: string,
    passwordAgain: string
}

export default function UserProfile(): JSX.Element {

    const { state } = useLocation();
    const [currentIndex, setCurrentIndex] = useState<number>(state.index ? state.index : 0);

    return (
        <div className="page" id="profile-page">

            <section id="user-profile">

                <div className="user-profile-container">
                    <nav>
                        <h2>Hesabım</h2>
                        <div className="headers noselect">
                            {headers.map((header, index) => {
                                const isSelected = currentIndex === index
                                return (
                                    <div key={index} onClick={() => setCurrentIndex(index)} className="header" style={{ background: isSelected ? "rgba(var(--theme-color-rgb), .1)" : "rgba(255,255,255,0)" }}>
                                        <header.icon className="icon" style={{ color: isSelected ? "var(--theme-color)" : "#999" }} />
                                        <span style={{ color: isSelected ? "var(--theme-color)" : "var(--color-black-smooth)" }}>{header.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </nav>
                    <Profile isSelected={currentIndex === 0} />
                    <Books isSelected={currentIndex === 1} />
                    <Offers isSelected={currentIndex === 2} />
                    <Favourites isSelected={currentIndex === 3} />
                </div>
            </section>
        </div>
    )
}

function Profile({ isSelected }: { isSelected: boolean }): JSX.Element {

    const authUser = useContext(FirebaseAuthContext)

    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: "",
        surname: "",
        photoUrl: "",
        phoneNumber: "",
        email: "",
        password: "",
        passwordAgain: "",
    })

    function convertFile(file: File) {
        const fileType: string = file.type
        const reader = new FileReader()
        reader.readAsBinaryString(file)
        reader.onload = (ev: any) => {
            setUserProfile(prev => ({ ...prev, photoUrl: `data:${fileType};base64,${btoa(ev.target.result)}` }))
        }
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => convertFile((e.target as HTMLInputElement).files![0])

    useEffect(() => {

        if (authUser) {
            setUserProfile(prev => ({ ...prev, email: authUser.email ?? "", name: authUser.displayName ?? "" }))
        }

    }, [authUser])

    return (
        <div className="profile-details details" style={{ display: isSelected ? "flex" : "none" }}>
            <header>
                <h2>Profilim</h2>
            </header>

            <div className="profile-content content">
                <div className="profile-image">
                    <img src={userProfile.photoUrl ? userProfile.photoUrl : authUser?.photoURL ? authUser!.photoURL : bookImg} alt="" />
                    <input type="file" id="image-input" onChange={handleFile} />
                    <label htmlFor="image-input">
                        <RiImageAddLine className="icon" />
                        <span>Choose a image</span>
                    </label>
                </div>

                <div className="profile">
                    <header>
                        <h3>Profile</h3>
                    </header>

                    <form>
                        <div className="inputWrapper">
                            <div className="input-wrapper">
                                <label htmlFor="name-input">Name</label>
                                <input id="name-input" type="text" value={userProfile.name} onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="surname-input">Surname</label>
                                <input type="text" value={userProfile.surname} onChange={(e) => setUserProfile(prev => ({ ...prev, surname: e.target.value }))} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="email-input">E-mail</label>
                                <input type="email" value={userProfile.email} onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="phone-input">Phone Number</label>
                                <input type="number" value={userProfile.phoneNumber} onChange={(e) => setUserProfile(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="city-input">City</label>
                                <select id="city-input">
                                    {cities.map(city => {
                                        return (
                                            <option value={city}>{city}</option>
                                        )
                                    })}
                                </select>
                            </div>

                        </div>

                        <header>
                            <h3>Account</h3>
                        </header>
                        <div className="inputWrapper">
                            <div className="input-wrapper">
                                <label htmlFor="password-input">Password</label>
                                <input type="password" value={userProfile.password} onChange={(e) => setUserProfile(prev => ({ ...prev, password: e.target.value }))} />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="password-again-input">Password Again</label>
                                <input type="password" value={userProfile.passwordAgain} onChange={(e) => setUserProfile(prev => ({ ...prev, passwordAgain: e.target.value }))} />
                            </div>
                        </div>
                    </form>


                </div>

            </div>
        </div>
    )
}

function Books({ isSelected }: { isSelected: boolean }): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [books, setBooks] = useState<IBook[]>([]);

    useEffect(() => {

        setBooks([]);

        dbModel.userBooks(firebase.auth().currentUser!.uid).onSnapshot((booksSnapshot) => {

            booksSnapshot.docChanges().forEach(bookSnapshot => {
                if (bookSnapshot.type === "added") {
                    setBooks(prev => [...prev, bookSnapshot.doc.data()])
                }
            })

            booksSnapshot.docChanges().forEach(bookSnapshot => {
                if (bookSnapshot.type === "removed") {
                    setBooks(prev => {
                        const deletedIndex = prev.findIndex(book => book.id === bookSnapshot.doc.id);
                        prev.splice(deletedIndex, 1);
                        return [...prev]
                    })
                }
            })
        })

    }, []);


    return (
        <div className="books-details details" style={{ display: isSelected ? "flex" : "none" }}>
            <header>
                <h2>My Books</h2>
            </header>

            <div className="books-content content">
                <button id="add-book" onClick={() => dispatch(setAddBookModal(true))}>
                    + Add book
                </button>

                <div className="books-content">


                    <div className="books-contentt">

                        {
                            books.length > 0 ? (
                                <div className="books">
                                    {
                                        books.map(book => {
                                            return (
                                                <div id={"book" + book.id} className="book-card" onClick={() => navigate("/book/" + book.id)}>
                                                    <a className="book-card-link">
                                                        <div className="book-card-container"  >
                                                            <div className="remove" onClick={async (e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                await dbModel.books.doc(book.id).delete();
                                                                await dbModel.userBooks(firebase.auth().currentUser!.uid).doc(book.id).delete();
                                                            }}>
                                                                <CgClose className="icon" />
                                                            </div>
                                                            <div className='image-container'>
                                                                {book.images && book.images!.length > 0 ? <img src={book.images![0]} alt="image" /> : <img src={BookImg}></img>}
                                                            </div>
                                                            <div className='attributes'>
                                                                <span>{book.title}</span>
                                                                <span>{book.author}</span>
                                                                <div style={{ flex: 1 }}></div>
                                                                <button className='trade-button' onClick={(e) => {
                                                                    e.preventDefault()
                                                                    e.stopPropagation()
                                                                }}>Trade</button>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        })}
                                </div>
                            ) : (
                                <div className="not-found">
                                    <BookImgg className="image" />
                                    <span>You dont have a book</span>
                                    <p>You can add book</p>
                                </div>
                            )
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

function Offers({ isSelected }: { isSelected: boolean }): JSX.Element {

    const [index, setIndex] = useState<number>(0)
    const [trades, setTrades] = useState<{
        gelen: ITrade[],
        giden: ITrade[]
    }>({
        gelen: [],
        giden: []
    });

    useEffect(() => {

        setTrades({
            gelen: [],
            giden: [],
        });

        dbModel.userTrades(firebase.auth().currentUser!.uid).get().then((userTrades) => userTrades.docs.forEach(trade => {
            if (trade.data().gonderen_kisi === firebase.auth().currentUser!.uid) {
                setTrades(prev => ({ ...prev, giden: [...prev.giden, trade.data()] }))
            } else {
                setTrades(prev => ({ ...prev, gelen: [...prev.gelen, trade.data()] }))
            }
        }))

    }, []);

    return (
        <div className="offers-details details" style={{ display: isSelected ? "flex" : "none" }}>
            <header>
                <h2>My Offers</h2>
            </header>

            <div className="offers-content content">
                <div className="links-container">
                    <div className="links">
                        {/* background: index === 1 ? "var(--theme-color)" : "rgba(255,255,255,0)", */}
                        <button onClick={() => setIndex(0)} style={{ color: index === 0 ? "rgb(230,230,230)" : "var(--color-gray-storm)" }}>Gelen</button>
                        <button onClick={() => setIndex(1)} style={{ color: index === 1 ? "rgb(230,230,230)" : "var(--color-gray-storm)" }}>Giden</button>
                        <div className="slider" style={{ left: index === 0 ? "0px" : "100px" }}></div>
                    </div>

                </div>

                {
                    index === 0 && (
                        <div className="received-offers offers">
                            {
                                trades.gelen.length > 0 ? (
                                    trades.gelen.map(trade => {

                                        return (
                                            <div className="offer">
                                                <div className="books">
                                                    <article>
                                                        <h4>Alacağın kitap</h4>
                                                        <div className="book-a">
                                                            <figure className="book">
                                                                <img src={trade.istenilen_kitap.img} alt="" />
                                                            </figure>
                                                            <div className="book-attributes">
                                                                <span className="title">{trade.istenilen_kitap.title}</span>
                                                                <span className="author">{trade.istenilen_kitap.author}</span>
                                                            </div>
                                                        </div>
                                                    </article>

                                                    <article>
                                                        <h4>Vereceğin kitap</h4>
                                                        <div className="book-a">
                                                            <figure className="book">
                                                                <img src={trade.teklif_edilen_kitap.img} alt="" />
                                                            </figure>
                                                            <div className="book-attributes">
                                                                <span className="title">{trade.teklif_edilen_kitap.title}</span>
                                                                <span className="author">{trade.teklif_edilen_kitap.author}</span>
                                                            </div>
                                                        </div>
                                                    </article>

                                                </div>
                                                <div className="actions">
                                                    <button className="accept">
                                                        <BsCheckLg className="icon" />
                                                    </button>
                                                    <button className="deny">
                                                        <MdOutlineClose className="icon" />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="not-found">
                                        <DealImg className="image" />
                                        <span>You dont have an offer.</span>
                                    </div>
                                )
                            }
                        </div>
                    )
                }

                {
                    index === 1 && (
                        <div className="sended-offers offers">
                            {
                                trades.giden.length > 0 ? (
                                    trades.giden.map(trade => {

                                        return (
                                            <div className="offer">
                                                <div className="books">
                                                    <article>
                                                        <h4>Alacağın kitap</h4>
                                                        <div className="book-a">
                                                            <figure className="book">
                                                                <img src={trade.istenilen_kitap.img} alt="" />
                                                            </figure>
                                                            <div className="book-attributes">
                                                                <span className="title">{trade.istenilen_kitap.title}</span>
                                                                <span className="author">{trade.istenilen_kitap.author}</span>
                                                            </div>
                                                        </div>
                                                    </article>

                                                    <article>
                                                        <h4>Vereceğin kitap</h4>
                                                        <div className="book-a">
                                                            <figure className="book">
                                                                <img src={trade.teklif_edilen_kitap.img} alt="" />
                                                            </figure>
                                                            <div className="book-attributes">
                                                                <span className="title">{trade.teklif_edilen_kitap.title}</span>
                                                                <span className="author">{trade.teklif_edilen_kitap.author}</span>
                                                            </div>
                                                        </div>
                                                    </article>

                                                </div>
                                                <div className="actions">
                                                    <button className="accept">
                                                        <BsCheckLg className="icon" />
                                                    </button>
                                                    <button className="deny">
                                                        <MdOutlineClose className="icon" />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="not-found">
                                        <DealImg className="image" />
                                        <span>You dont have an offer.</span>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

function Favourites({ isSelected }: { isSelected: boolean }): JSX.Element {

    const favouriteDal = new FavouriteDal()
    const { value, toggle } = useToggle()

    const [favouritesFetchState, setFavouritesFetchState] = useState<CustomFavourite>({
        startAfter: undefined,
        books: [],
        fetching: false,
        fetched: false
    })

    const getFavouriteBooks = useCallback(async () => {
        const newFetchState = await favouriteDal.get(favouritesFetchState)
        setFavouritesFetchState(newFetchState)
    }, [])

    useEffect(() => {
        getFavouriteBooks()
    }, [value])

    return (
        <div className="favourites-details details" style={{ display: isSelected ? "flex" : "none" }}>
            <header onClick={toggle}>
                <h2>My Favourites</h2>
            </header>

            <div className="favourites-content content">
                <div className="books">
                    {
                        favouritesFetchState.books.length > 0 && favouritesFetchState.books.map((book, index) => {
                            return (
                                <BookCardA book={book} key={index} isFavourite={true} />
                            )
                        })
                    }

                    {
                        favouritesFetchState.fetching && (
                            <>
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

                {
                    favouritesFetchState.fetched && favouritesFetchState.books.length === 0 && (
                        <div className="not-found">
                            <FavouriteImg className="image" />
                            <span>No favourites yet.</span>
                            <p>Your favorite books will appear here, you can add them to your favorite books by clicking the heart icon above the books.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}