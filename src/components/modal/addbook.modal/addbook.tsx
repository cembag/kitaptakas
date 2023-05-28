import "./addbook.scss"
import firebase from "firebase/app"
import { ReactComponent as  ImageImg} from "../../../assets/images/ic_image.svg";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import BookType, { bookTypes } from "../../../context/book/book.types";
import { BookCondition, BookConditions, BookLanguage, BookLanguages, BookLegibilites, BookLegibility } from "../../../models/book";
import { setAddBookModal } from "../../../provider/modals/modals.reducer";
import { useAppDispatch, useTypedSelector } from "../../../provider/store";
import { Rings } from "react-loader-spinner"
import BookDal from "../../../dal/book/book.dal";

type AddBook = {
    images: (string | ArrayBuffer | null)[]
    title: string
    author: string
    condition: BookCondition
    legibility: BookLegibility
    number_of_pages: number
    language: BookLanguage
    type: BookType
    in_process: boolean
}

export default function AddBookModal(): JSX.Element {

    const bookDal = new BookDal();
    const dispatch = useAppDispatch()
    const modal = useTypedSelector(state => state.modals.addbook)
    const initialBook: AddBook = {
        images: [],
        title: "",
        author: "",
        condition: "Good",
        legibility: "Legible",
        number_of_pages: 0,
        language: "Tr",
        type: "Autobiography",
        in_process: false
    }
    const [addBookState, setAddBookState] = useState<AddBook>(initialBook);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = new FileReader()
        data.addEventListener("load", () => setAddBookState(prev => ({...prev, images: [...prev.images, data.result]})));
        data.readAsDataURL(e.target.files![0]);
    }
    //const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => setAddBookState(prev => ({...prev, images: [...prev.images, (e.target as HTMLInputElement).files![0]]}));

    async function addBook() {
        setAddBookState(prev => ({...prev, in_process: true}));
        await bookDal.addBook({
            id: "",
            images: addBookState.images as string[],
            title: addBookState.title,
            author: addBookState.author,
            condition: addBookState.condition,
            legibility: addBookState.legibility,
            language: addBookState.language,
            number_of_pages: addBookState.number_of_pages,
            type: addBookState.type,
            has_missing_page: false,
            publisher: "",
            shared_by: firebase.auth().currentUser!.uid,
            created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        });
        setAddBookState(initialBook);
        dispatch(setAddBookModal(false));
    }

    return (
        <>{
            modal && (
                <div className="modal-bg" onClick={() => {
                    dispatch(setAddBookModal(false));
                    setAddBookState(initialBook);
                }}>
                    <div id="addbook-modal" className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-container">
                            <header>
                                <div className="empty"></div>
                                <h2>Add Book</h2>
                                <div className="close-button" onClick={() => {
                                    dispatch(setAddBookModal(false));
                                    setAddBookState(initialBook);
                                }}>
                                    <CgClose className="close-icon" />
                                </div>
                            </header>

                            <form className="with-scroll">
                                <label>Images</label>
                                <div className="book-images">
                                    <div className="images">
                                        {
                                            addBookState.images.length > 0 && addBookState.images.map((image, index) => {
                                                return (
                                                    <figure>
                                                        {/* {image.name} */}
                                                        <img src={image as string} alt="" />
                                                        <button type="button" onClick={() => setAddBookState(prev => {
                                                            prev.images.splice(index, 1)
                                                            return {...prev, images: prev.images}
                                                        })}>
                                                            <CgClose className="icon"/>
                                                        </button>
                                                    </figure>
                                                )
                                            })
                                        }

                                        {
                                            addBookState.images.length === 0 && (
                                                <div className="no-image">
                                                    <span>Didn't upload any image.</span>
                                                    <p>You must add at least 1 and at most 5 images</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <label htmlFor="book-image">
                                        <ImageImg className="icon"/>
                                        <span>Add image</span>
                                    </label>
                                    <input id="book-image" type="file" onChange={handleImage}/>
                                </div>

                                <label htmlFor="book-title">Title</label>
                                <input id="book-title" placeholder="Name of the book" type="text" value={addBookState.title} onChange={(e) => setAddBookState(prev => ({...prev, title: e.target.value}))}/>
                                <label htmlFor="book-author">Author</label>
                                <input id="book-author" placeholder="Author fullname of the book" type="text" value={addBookState.author} onChange={(e) => setAddBookState(prev => ({...prev, author: e.target.value}))}/>
                                <label htmlFor="book-condition">Condition</label>
                                <select name="condition" id="book-condition" onChange={(e) => setAddBookState(prev => ({...prev, condition: e.target.value as BookCondition}))}>
                                    {
                                        BookConditions.map((condition, index) => {
                                            return (
                                                <option key={index} value={condition}>{condition}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor="book-legibility">Legibility</label>
                                <select name="condition" id="book-legibility" onChange={(e) => setAddBookState(prev => ({...prev, legibility: e.target.value as BookLegibility}))}>
                                    {
                                        BookLegibilites.map((legibility, index) => {
                                            return (
                                                <option key={index} value={legibility}>{legibility}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor="book-language">Language</label>
                                <select name="language" id="book-language" onChange={(e) => setAddBookState(prev => ({...prev, language: e.target.value as BookLanguage}))}>
                                    {
                                        BookLanguages.map((language, index) => {
                                            return (
                                                <option key={index} value={language}>{language}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor="book-type">Type</label>
                                <select name="type" id="book-type" onChange={(e) => setAddBookState(prev => ({...prev, type: e.target.value as BookType}))}>
                                    {
                                        bookTypes.map((type, index) => {
                                            return (
                                                <option key={index} value={type}>{type}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor="book-pages">Number of Pages</label>
                                <input placeholder="Number of pages" type="number" id="book-pages" onChange={(e) => setAddBookState(prev => ({...prev, number_of_pages: Number(e.target.value)}))}/>
                            </form>
                            
                            <div className="space"></div>
                            <button onClick={addBook} style={{opacity: (addBookState.images.length > 0 && addBookState.title && addBookState.author && addBookState.condition && addBookState.legibility && addBookState.language && addBookState.number_of_pages && addBookState.type) ? "1" : ".4", pointerEvents: (addBookState.images.length > 0 && addBookState.title && addBookState.author && addBookState.condition && addBookState.legibility && addBookState.language && addBookState.number_of_pages && addBookState.type) ? "all" : "none", cursor: (addBookState.images.length > 0 && addBookState.title && addBookState.author && addBookState.condition && addBookState.legibility && addBookState.language && addBookState.number_of_pages && addBookState.type) ? "pointer" : "not-allowed"}}>
                                {
                                    addBookState.in_process ? (
                                        <Rings 
                                        height="50"
                                        width="50"
                                        color="var(--brand-color)"
                                        radius="8"
                                        wrapperStyle={{}}
                                        wrapperClass="loader"
                                        visible={true}
                                        ariaLabel="rings-loading"/>
                                    ) : (
                                        <span>Add book</span>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )
        }</>
    )
}