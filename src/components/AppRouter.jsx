import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart'
import Category from '../pages/Category'
import Product from '../pages/Product'

export class AppRouter extends Component {
    render() {
        return (
            <Routes>
                <Route path='/' element={<Category />} />
                <Route path='/Product/:id' element={<Product />} />
                <Route path='/Cart' element={<Cart />} />
            </Routes>
        )
    }
}

export default AppRouter