import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

// passing these things as props
function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // dispatch the item/change into the data layer
        dispatch({
            // function to be called
            type: "REMOVE_FROM_BASKET",
            // what all details to dispatch with what values
            id: id,

            
        });
    };


    return (
        <div className='checkoutProduct'>
            {/* the image */}
            <img src= {image} 
            className="checkoutProduct__image" />

            {/* div enclosing all the details */}
            <div className="checkoutProduct__info">
                {/* p tag containg the title of our product */}
                <p className="checkoutProduct__title">
                    {title}
                </p>

                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong> {price} </strong>
                </p>

                <div className="checkoutProduct__rating">
                    {/* an array of stars which will be filled equal to the number of rating we have provided */}
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                    <p>⭐</p>
                    ))}
                </div>
                
                {/* display the butoon only when hidebutton is false */}
                {!hideButton && (
                <button onClick={removeFromBasket}>
                    Remove from Basket
                </button>)}
                

            </div>
        </div>
    )
}

export default CheckoutProduct
