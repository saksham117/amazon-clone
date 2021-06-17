import React from 'react'
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className ='home'>
            {/* first we are gonna have a container over here */}
            <div className="home_container">
                <img 
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"

                />
                {/* now we are adding div rows which will store our products */}
                <div className="home__row">
                    {/* Product */}
                    <Product
                    id = "12321341"
                    title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback "
                    price={29.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/51-cYrw1XpL._AC_SY400_.jpg" 
                    rating={5}
                    />
                    {/* Product */}
                    <Product
                    id = "49538094"
                    title="KenWood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
                    price={239.0}
                    image="https://images-na.ssl-images-amazon.com/images/I/61FJtVQh9bL._SL1200_.jpg" 
                    rating={4}
                    />

                </div>

                <div className="home__row">
                    {/* Product */}
                    <Product 
                    id = "3254354345"
                    title="New Apple iPad Pro (12.9-inch, WiFi, 128GB) - Silver (4th Generation)"
                    price={598.99}
                    image="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-12-select-wifi-silver-202104_GEO_IN?wid=470&hei=556&fmt=p-jpg&qlt=95&.v=1617922048000" 
                    rating={4}
                    />
                    {/* Product */}
                    <Product 
                    id = "23445930"
                    title="Amazon Echo ( 3rd generation ) Smart Speaker with Alexa, Charcoal Fabric"
                    price={98.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/61b4qFTXRML._AC_SL1000_.jpg" 
                    rating={5}
                    />
                    {/* Product */}
                    <Product
                    id = "325435123"
                    title="Sony WH-1000XM4 Industry Leading Wireless Noise Cancelling Headphones, Bluetooth Headset with Mic for Phone Calls, 30 Hours Battery Life, Quick Charge, Touch Control & Alexa Voice Control – (Black)"
                    price={400}
                    image="https://images-na.ssl-images-amazon.com/images/I/71o8Q5XJS5L._SL1500_.jpg" 
                    rating={5}
                     />
                   

                </div>

                <div className="home__row">
                    {/* Product */}
                    <Product
                    id = "4903850"
                    title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                    price={199.99}
                    image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SL1000_.jpg" 
                    rating={3}
                     />
                </div>
                
            </div>
        </div>
    )
}

export default Home
