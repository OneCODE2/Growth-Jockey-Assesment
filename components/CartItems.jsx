import React from 'react';
import './CartItem.css'


function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <div className="cart-item">
        <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-details">
        <div>{item.name}</div>
        <div className="details">{item.details}</div>
      </div>
      <div className="item-price">₹{item.price.toFixed(2)}</div>
      <div className="item-quantity">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </div>
      <div className="item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
    </div>
  );
}


export default CartItem;