import './app.css'
import firebase from "firebase"
import React from 'react'
import useTheme from "./context/theme/useTheme";
import { useTypedSelector } from './provider/store';
import BookDal from './dal/book/book.dal';

export default function App(): JSX.Element {

  const {theme} = useTypedSelector(state => state)
  const themeModel = useTheme(theme.theme)


  const bookDal = new BookDal()

  //useListenUser()

  return (
    <main className="app" style={{...themeModel as React.CSSProperties}}>
      <div style={{width: "200px", height: "40px", borderRadius: "7px", background: "black", color: "white", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center"}}
      onClick={async () => {
        await bookDal.addBook({
          id: "default",
          title: "Kağıttan Kalpler",
          author: "Courtney Walsh",
          publisher: "Arkadya Yayınları",
          language: "Tr",
          shared_by: "id",
          condition: "Good",
          legibility: "Legible",
          has_missing_page: false,
          number_of_pages: 454,
          type: "Romance",
          created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        })
      }}>
        Add book
      </div>
        {/* <Router/> */}
    </main>
  );
}