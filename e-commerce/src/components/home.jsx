import React from 'react'
import { cartState } from '../contexts/contextApi'
import SingleProduct from './singleProduct'
import Filters from './filters'
import "./styles.css"

export default function Home() {
  
  const {state :{product}, productState:{searchQuery,byRating,sort}} = cartState()

  //console.log(sort,byRating)

  const transformProducts = () => {
    let sortedProducts = product;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }


    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.rating >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};
