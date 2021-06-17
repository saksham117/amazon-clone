import React from "react";
import './Product.css';
import {useStateValue} from "./StateProvider"

// we passed a prop to the Product to make each product dynamic
function Product( { id, title, image, price, rating } ) {
    // base syntax we need to write
    const [{ basket }, dispatch] = useStateValue();

    console.log('this is the basket >>>', basket);

    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
            // function to be called
            type: "ADD_TO_BASKET",
            // what all details to dispatch with what values
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className='product'>
        {/* the title of the product along with price ans start rating*/}
            <div className="product__info">
                <p>{title}</p>

                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className="product__rating">
                    {/* an array of stars which will be filled equal to the number of rating we have provided */}
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                    <p>⭐</p>
                    ))}

                </div>
            </div>

            {/* here we will have image of our product */}
            <img 
            src={image} 
            alt="" 
             />

            {/* button */}
            <button onClick={addToBasket}>
                Add to Basket
            </button>
        </div>
    )
}

export default Product
 