import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddBook from "./screens/add.book/add.book";
import BookProfile from "./screens/book.profile/book.profile";
import FilterBook from "./screens/filter.book/filter.book";
import Home from "./screens/home/home";
import NotFound from "./screens/not.found/not.found";
import UserProfile from "./screens/user.profile/user.profile";

export default function Router(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace={true}/>}/>
                <Route path="/books/add" element={<AddBook/>}/>
                <Route path="/books/filter" element={<FilterBook/>}/>
                <Route path="/user/*" element={<UserProfile/>}/>
                <Route path="/book/*" element={<BookProfile/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}