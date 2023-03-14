import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./screens/add.book/add.book";
import Home from "./screens/home/home";

export default function Router(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/add_book" element={<AddBook/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}