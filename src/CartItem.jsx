import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items); // Access cart items from Redux store
  const dispatch = useDispatch(); // Redux dispatch function

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0; // Initialize a variable to hold the cumulative sum
    cart.forEach(item => {
      // For each item, extract its quantity and cost
      const quantity = item.quantity;
      // Convert the cost string (e.g., "$10.00") to a number using parseFloat(item.cost.substring(1))
      const cost = parseFloat(item.cost.substring(1));
      // Multiply cost by quantity and add to total
      total += cost * quantity;
    });
    return total.toFixed(2); // Return the final total sum with 2 decimal places
  };

  const handleContinueShopping = (e) => {
    // Call the onContinueShopping function passed from the parent component
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    // Use updateQuantity action to increase item quantity by 1
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    // Use updateQuantity action to change quantity or removeItem to delete
    if (item.quantity > 1) {
      // If quantity > 1, dispatch updateQuantity to decrease quantity by 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity would drop to 0, dispatch removeItem to remove the plant from cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // Use removeItem action to delete an item completely from the cart
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Extract the numeric value from the item's cost string
    const cost = parseFloat(item.cost.substring(1));
    // Multiply by quantity to get total cost for this item
    const totalCost = cost * item.quantity;
    return totalCost.toFixed(2); // Return with 2 decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;