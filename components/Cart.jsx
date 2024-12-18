import React, { useEffect, useState } from 'react';
import CartItem from './CartItems';
import { products } from './Products';

function Cart() {

  const [cartItems, setCartItems] = useState(
    products.map(product => ({ ...product, quantity: 1 }))
  );
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); 

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const gst = subtotal * 0.18;

  

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    ));
  };


  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity - 1) } 
        : item
    ));
  };

  const applyPromoCode = () => {
    if (promoCode === "FLAT500" && total>=500) {
      setDiscount(500); 
    } else if (promoCode === "DISCOUNT20" && total>=0.2*subtotal) {
      setDiscount(Math.min(0.2 * subtotal, 500)); 
    } else {
      setDiscount(0); 
    }
  };


  
  const total = subtotal + gst - discount;
  useEffect( ()=> {
    if(total<discount){
      setDiscount(0);
    }
  },[total])
 
  
  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className='heading'>
        <h4 className='title'>Product Name & Details</h4>
        <h4 className='pri'>Price</h4>
        <h4 className='quan'>Quantity</h4>
        <h4 className='tot'>Total</h4>
      </div>
      
      {/* Cart Items */}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={() => increaseQuantity(item.id)}
          onDecrease={() => decreaseQuantity(item.id)}
        />
      ))}

     <div className='footer'>
         {/* Promo Code Section */}
        <div className="promo-code">
          <div className='inner'>
            <select
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              >
              <option value="">Select Promo Code</option>
              <option value="FLAT500">FLAT500 - ₹500 Off</option>
              <option value="DISCOUNT20">DISCOUNT20 - 20% Off (Max ₹500)</option>
            </select>
            <button onClick={applyPromoCode}>Apply</button>
          </div>
          {discount > 0 && <div className="discount">Discount Applied: ₹{discount}</div>}
        </div>

        {/* Price Breakdown  */}
        <div className="price-summary">
          <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
          <div>GST (18%): ₹{gst.toFixed(2)}</div>
          {discount > 0 && (
            <div>Discount: ₹{discount.toFixed(2)}</div>
          )}
          <div className="total">Total: ₹{total<0? 0:total.toFixed(2)}</div>
        </div>
     </div>
    </div>
  );
  
}

export default Cart;
