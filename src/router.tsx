import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddBook from "./screens/add.book/add.book";
import FilterBook from "./screens/filter.book/filter.book";
import Home from "./screens/home/home";

export default function Router(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace={true}/>}/>
                <Route path="/add_book" element={<AddBook/>}/>
                <Route path="/filter_book" element={<FilterBook/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}