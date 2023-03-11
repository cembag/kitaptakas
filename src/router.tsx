import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/home.screen/home.screen";

export default function Router(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}