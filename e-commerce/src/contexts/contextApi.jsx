import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { cartReducer, productReducer } from './reducers'

const Cart = createContext()

export default function Context({children}) {
  const [product, setProduct] = useState([])

  const fetchProducts = async()=>{
    const res = await fetch("https://dummyjson.com/products")
    const data = await res.json()
    setProduct(data.products)
  }
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  
  const [state, dispatch] = useReducer(cartReducer, {
    product : product,
    cart:[]
  })

 const [productState, productDispatch] = useReducer(productReducer,{
  byRating: 0,
  searchQuery : "",
 })

  
  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: product });
  }, [product]);
  

  return <Cart.Provider value={{state, dispatch, productState, productDispatch}}>{children}</Cart.Provider>

}

export const cartState=()=>{
  return useContext(Cart)
}
