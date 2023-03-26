import "./user.profile.scss"
import { ReactComponent as FavouriteImg } from "../../assets/images/favourite.svg"
import { ReactComponent as BookImg } from "../../assets/images/book.svg"
import { ReactComponent as DealImg } from "../../assets/images/deal.svg"
import { useCallback, useContext, useEffect, useState } from "react";
import cities from "../../context/city/cities";
import { RiImageAddLine, RiUserFill } from "react-icons/ri";
import { IconType } from "react-icons";
import { GiOpenBook } from "react-icons/gi";
import { MdLocalOffer } from "react-icons/md";
import { HiHeart } from "react-icons/hi";
import { FirebaseAuthContext } from "../../hooks/auth.provider";
import bookImg from "../../assets/images/ic_book.png"
import { TbArrowBigLeftLineFilled } from "react-icons/tb";
import { BsCheckLg } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md"
import BookCardA from "../../components/card/book/book.card.a/book.card";
import FavouriteDal, { CustomFavourite } from "../../dal/favourite/favourite.dal";
import useToggle from "../../hooks/use.toggle";
import BookCardASkeletion from "../../components/card/book/book.card.a/book.card.a.skeletion";
import { useAppDispatch } from "../../provider/store";
import { setAddBookModal } from "../../provider/modals/modals.reducer";


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

    const [currentIndex, setCurrentIndex] = useState<number>(0);

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

    const dispatch = useAppDispatch()

    return (
        <div className="books-details details" style={{ display: isSelected ? "flex" : "none" }}>
            <header>
                <h2>My Books</h2>
            </header>

            <div className="books-content content">
                <button id="add-book" onClick={() => dispatch(setAddBookModal(true))}>
                    + Add book
                </button>

                <div className="books">
                    <div className="not-found">
                        <BookImg className="image"/>
                        <span>You dont have a book</span>
                        <p>You can add book</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Offers({ isSelected }: { isSelected: boolean }): JSX.Element {

    const [index, setIndex] = useState<number>(0)

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
                            {/* <div className="offer">
                                <div className="books">
                                    <article>
                                        <h4>Alacağın kitap</h4>
                                        <figure className="book">
                                            <img src="https://kbimages1-a.akamaihd.net/Images/fac26a92-7e60-4d99-8483-760776647e3a/255/400/False/image.jpg" alt="" />
                                        </figure>
                                        <div className="book-attributes">
                                            <span className="title">Bir kitap</span>
                                            <span className="author">Bir yazar</span>
                                        </div>
                                    </article>

                                    <article>
                                        <h4>Vereceğin kitap</h4>
                                        <figure className="book">
                                            <img src="https://i.dr.com.tr/cache/500x400-0/originals/0000000636324-1.jpg" alt="" />
                                            <div className="book-attributes">
                                                <span className="title">Bir kitap</span>
                                                <span className="author">Bir yazar</span>
                                            </div>
                                        </figure>
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
                            </div> */}
                            {/* <div className="offer">
                                <div className="books">
                                    <figure className="book">
                                        <img src="https://kbimages1-a.akamaihd.net/Images/fac26a92-7e60-4d99-8483-760776647e3a/255/400/False/image.jpg" alt="" />
                                        <div className="book-attribute">
                                            <span className="title">Bir kitap</span>
                                            <span className="author">Bir yazar</span>
                                        </div>
                                    </figure>

                                    <TbArrowBigLeftLineFilled className="icon" />

                                    <figure className="book">
                                        <img src="https://i.dr.com.tr/cache/500x400-0/originals/0000000636324-1.jpg" alt="" />
                                        <div className="book-attribute">
                                            <span className="title">Bir kitap</span>
                                            <span className="author">Bir yazar</span>
                                        </div>
                                    </figure>
                                </div>
                                <div className="actions">
                                    <button className="accept">
                                        <BsCheckLg className="icon" />
                                    </button>
                                    <button className="deny">
                                        <MdOutlineClose className="icon" />
                                    </button>
                                </div>
                            </div> */}
                            {/* <div className="offer">
                                <div className="books">
                                    <figure className="book">
                                        <img src="https://kbimages1-a.akamaihd.net/Images/fac26a92-7e60-4d99-8483-760776647e3a/255/400/False/image.jpg" alt="" />
                                        <div className="book-attribute">
                                            <span className="title">Bir kitap</span>
                                            <span className="author">Bir yazar</span>
                                        </div>
                                    </figure>

                                    <TbArrowBigLeftLineFilled className="icon" />

                                    <figure className="book">
                                        <img src="https://i.dr.com.tr/cache/500x400-0/originals/0000000636324-1.jpg" alt="" />
                                        <div className="book-attribute">
                                            <span className="title">Bir kitap</span>
                                            <span className="author">Bir yazar</span>
                                        </div>
                                    </figure>
                                </div>
                                <div className="actions">
                                    <button className="accept">
                                        <BsCheckLg className="icon" />
                                    </button>
                                    <button className="deny">
                                        <MdOutlineClose className="icon" />
                                    </button>
                                </div>
                            </div> */}

                            <div className="not-found">
                                <DealImg className="image"/>
                                <span>You dont have an offer.</span>
                            </div>
                        </div>
                    )
                }

                {
                    index === 1 && (
                        <div className="sended-offers offers">
                            <div className="not-found">
                                <DealImg className="image"/>
                                <span>You dont have an offer.</span>
                            </div>
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