import { PropsWithChildren, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddBook from "./screens/add.book/add.book";
import BookProfile from "./screens/book.profile/book.profile";
import Books from "./screens/books/books";
import Home from "./screens/home/home";
import NotFound from "./screens/not.found/not.found";
import Sss from "./screens/sss/sss";
import UserProfile from "./screens/user.profile/user.profile";
import { FirebaseAuthContext } from "./hooks/auth.provider"
import { useAppDispatch } from "./provider/store";
import { setSignupModal } from "./provider/modals/modals.reducer";

const ProtectedRoute = ({children}: {children: JSX.Element}): JSX.Element => {
    const dispatch = useAppDispatch()
    const authUser = useContext(FirebaseAuthContext)

    console.log(authUser)

    if(!authUser) {
        dispatch(setSignupModal(true))
        return (
            <Navigate to={"/"}></Navigate>
        )
    }

    return children
}

export default function Router(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace={true}/>}/>
            <Route path="/books" element={<Books/>}/>
            <Route path="/profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
            <Route path="*/profile" element={<UserProfile/>}/>
            <Route path="/book/*" element={<BookProfile/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/Sss" element={<Sss/>}/>
        </Routes>
    )
}