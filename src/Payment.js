import React, { useState, useEffect  } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const [ {basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    // two very important hooks to use for our payment gateway
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    // this will change or this effect will apply everytime we change our basket
    useEffect(() => {
        // generate the special stripe secret for every transaction which allows us to charge a customer
        // axios is a way of making a get/post request
        const getClientSecret = async () => {
            // retrieves the secret key for the current transaction by redirecting us to that url
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits (that is why multiplying by 100, as base unit of dollars is cents)
                //  in this / before payemnets/create means the base url which we defined in axios.js
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    // console.log('THE SECRET IS >>>', clientSecret)
    // console.log('👱', user)

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true); // this will prevent us from clcikcing the buy now button again as button state will be set to true

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                   
                  },
            }
            // once the above is done, then do this
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            // no sql database type 
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true);
            setError(null)
            setProcessing(false)
            
            // empty the basket once the order has been placed
            dispatch({
                type: 'EMPTY_BASKET'
            })

            // not push but replace
            history.replace('/orders')
        })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout {<Link to="/checkout">
                        {basket?.length} items
                    </Link>}
                </h1>
                {/* Payment Section - delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>

                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Bay Area</p>
                        <p>Chandigarh, India</p>
                    </div>
                </div>

                {/* Payment Section - Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>

                    <div className="payment__items">
                    {/* reused the checkour product component */}
                        {basket.map(item => (
                            <CheckoutProduct
                            id = {item.id} 
                            title = {item.title}
                            image = {item.image}
                            price = {item.price}
                            rating = {item.rating}  
                            />
                    ))}
                    </div>
                    
                </div>

                {/* Payment Section - Payment Method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="payment__details">
                        {/* Stripe magic will come */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                            {/* using the currency format */}
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            {/* button is gonna be disabled if we are in either of these states */}
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                            </div>
                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Payment 
