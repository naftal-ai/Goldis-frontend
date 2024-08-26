import React from 'react';
import ProductCard from '../components/ProductCard.js';
import useCart  from '../hooks/useCart.js';
import './styles/cart.css';
const CartPage = () => {
  const {state} =useCart();

  
  
  return (
    <div className="cart-page">
    <ul className="products-list cart-list">
      {state.map(({p}) => (
        <li key={p._id} className='product-card'>
        <ProductCard product={p} />
        </li>))}
    </ul>
    <ul className="sidebar">
      <li className="action"></li>
      <li className="action"></li>
      <li className="action"></li>
      <button>buyNow</button>
    </ul>
    </div>
  )
}

export default CartPage