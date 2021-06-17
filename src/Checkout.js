import React from 'react';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
    // using the hook to retrieve the global memoery
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className="checkout">
            {/* we have two containers, one the left side and one the right side */}
            <div className="checkout__left">
                <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEd8_HYHcSF45ZRPwXo02FoxyxtRQYPYyTQ&usqp=CAU" 
                alt="" 
                className="checkout__ad" />

                <div>
                    <h3>
                       Hello, {user?.email}
                    </h3>
                    <h2 className="checkout__title">
                        Your Shopping Basket
                    </h2>

                    {basket.map(item => (
                        <CheckoutProduct
                        id = {item.id} 
                        title = {item.title}
                        image = {item.image}
                        price = {item.price}
                        rating = {item.rating}  
                        />
                    ))}
                    {/* Checkout Product */}


                </div>
            </div>

            <div className="checkout__right">
               <Subtotal />
            </div>

        </div>
    )
}

export default Checkout
