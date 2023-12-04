import React from 'react'
import { Routes, Route } from "react-router-dom"
import FavouritePackage from '../pages/FavPack'
import AddFavouritePackage from '../pages/AddNew'

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<FavouritePackage />} />
            <Route path='/add-favourite' element={<AddFavouritePackage />} />
        </Routes>
    )
}
