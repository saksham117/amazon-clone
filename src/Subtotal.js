import React from 'react';
import './Subtotal.css';
// for the currency module
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { Link, useHistory } from 'react-router-dom';


function Subtotal() {
    const history = useHistory(); // gives us the browser history
    const [ {basket}, dispatch] = useStateValue();

    return (
        <div className='subtotal'>
            <CurrencyFormat 
            // render text is what gets rendered on thwe screen
                renderText = {(value) => (
                    <>
                        <p>
                        {/* basket.length, just like in our header will shhow the number of products in our basket */}
                            Subtotal ({basket.length} items):
                            <strong>{value}</strong>
                        </p>
                        <small className='subtotal_gift'>
                            <input type='checkbox' /> 
                            This order contains a gift.    
                        </small>
                    </>
                )}
                decimalScale ={2} // meand decimal points weill be 2 in number
                value={getBasketTotal(basket)} // the current amount we have shopped for
                displayType={"text"}
                thousandSeparator={true} // like display a comma after a thousand dollars
                prefix={'$'} // currrency prefix
            />
            {/* on clicking we need to create an event whihc redirects us to the /payment url. This helps us to mantain the styling of a button and it doe not look like we are clicking on a link */}
            <button onClick={e => history.push('/payment')}>
                Proceed to Checkout
            </button> 
        </div>
    )
}

export default Subtotal
