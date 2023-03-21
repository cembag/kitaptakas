import { useEffect, useState } from "react";
import { rDb } from "../config/firebase";

type BookFavouriteData = {
    count: number,
    favourites: string[]
}

export default function useListenBookFavourites(bookId: string | undefined): BookFavouriteData {
    
    const [bookFavouriteData, setBookFavouriteData] = useState<BookFavouriteData>({
        count: 0,
        favourites: []
    })

    useEffect(() => {

        if(bookId) {

            rDb.ref("books/" + bookId + "/favourites/-favourites-count").on("value", (countSnap) => {

                const count = countSnap.val() as number

                console.log(count)

                if(count) {
                    setBookFavouriteData(prev => ({
                        ...prev,
                        count: count
                    }))
                }
            })

            rDb.ref("books/" + bookId + "/favourites").limitToFirst(5).get().then((favouritesSnap) => {
                let favourites: string[] = []
                favouritesSnap.forEach(favourite => {
                    favourites.push(favourite.val())
                })
                setBookFavouriteData(prev => ({...prev, favourites: favourites}))

                rDb.ref("books/" + bookId + "/favourites").on("child_added", (favourite) => {
                    setBookFavouriteData(prev => ({...prev, favourites: [...prev.favourites, favourite.val() as string]}))
                })
                
                rDb.ref("books/" + bookId + "/favourites").on("child_removed", (favourite) => {
                    setBookFavouriteData(prev => {
                        const index = prev.favourites.indexOf(favourite.val() as string, 1)
                        prev.favourites.splice(index, 1)
                        return {...prev, favourites: prev.favourites}
                    })
                })
            })
        }

        return () => {
            rDb.ref("books/" + bookId + "/favourites/-favourites-count").off("value")
            rDb.ref("books/" + bookId + "/favourites").off("child_added")
            rDb.ref("books/" + bookId + "/favourites").off("child_removed")
        }

    }, [bookId])

    return bookFavouriteData
}