import "./add.book.scss"
import React, { useState } from "react"
import firebase from "firebase"
import BookDal from "../../dal/book/book.dal"
import IBook, { BookCondition, BookConditions, BookLanguage, BookLanguages, BookLegibility, BookLegibilites } from "../../models/book"
import bookTypes, { BookTypes } from "../../context/book/book.types"


export default function AddBook(): JSX.Element {

    const bookDal = new BookDal()
    
    const [book, setBook] = useState<Partial<IBook>>({
        title: "",
        author: "",
        publisher: "",
        language: "Tr",
        condition: "Good",
        legibility: "Legible",
        has_missing_page: false,
        number_of_pages: 300,
        type: "Philosophy",
    })
    
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setBook(prev => ({...prev, title: e.target.value}))
    const handleAuthor = (e: React.ChangeEvent<HTMLInputElement>) => setBook(prev => ({...prev, author: e.target.value}))
    const handlePublisher = (e: React.ChangeEvent<HTMLInputElement>) => setBook(prev => ({...prev, publisher: e.target.value}))
    const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => setBook(prev => ({...prev, language: e.target.value as BookLanguage}))
    const handleCondition = (e: React.ChangeEvent<HTMLSelectElement>) => setBook(prev => ({...prev, condition: e.target.value as BookCondition}))
    const handleLegibility = (e: React.ChangeEvent<HTMLSelectElement>) => setBook(prev => ({...prev, legibility: e.target.value as BookLegibility}))
    const handleNumberOfPages = (e: React.ChangeEvent<HTMLInputElement>) => setBook(prev => ({...prev, number_of_pages: parseInt(e.target.value)}))
    const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => setBook(prev => ({...prev, type: e.target.value as BookTypes}))

    return (
        <div id="add_book" className="page">

            <form action="" id="add-book-form">
                <input id="titleInput" placeholder="title" onChange={handleTitle}/>
                <input id="authorInput" placeholder="author" onChange={handleAuthor}/>
                <input id="publisherInput" placeholder="publisher" onChange={handlePublisher}/>
                <select id="languageSelect" value={book.language} onChange={handleLanguage}>
                    {
                        BookLanguages.map((language, index) => {
                            return (
                                <option key={index} value={language}>{language}</option>
                            )
                        })
                    }
                </select>
                <select id="conditionSelect" value={book.condition} onChange={handleCondition}>
                    {
                        BookConditions.map((condition, index) => {
                            return (
                                <option key={index} value={condition}>{condition}</option>
                            )
                        })
                    }
                </select>
                <select id="legibilitySelect" value={book.legibility} onChange={handleLegibility}>
                    {
                        BookLegibilites.map((legibility, index) => {
                            return (
                                <option key={index} value={legibility}>{legibility}</option>
                            )
                        })
                    }
                </select>
                <select id="typeSelect" value={book.type} onChange={handleType}>
                    {
                        bookTypes.map((type, index) => {
                            return (
                                <option key={index} value={type}>{type}</option>
                            )
                        })
                    }
                </select>
                <input id="numberOfPagesInput" placeholder="number of pages" type={"number"} onChange={handleNumberOfPages}></input>
            </form>

            <div style={{width: "200px", height: "40px", borderRadius: "7px", background: "black", color: "white", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center"}}
            onClick={async () => {
                await bookDal.addBook({
                id: "default",
                title: book.title!,
                author: book.author!,
                publisher: book.publisher!,
                language: book.language!,
                shared_by: "id",
                condition: book.condition!,
                legibility: book.legibility!,
                has_missing_page: false,
                number_of_pages: book.number_of_pages!,
                type: book.type!,
                created_at: firebase.firestore.Timestamp.fromDate(new Date())
                })
            }}>
                Add book
            </div>
        </div>
    )
}