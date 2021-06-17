// typing rfce renders a complete functional component for us with the correct name
import React from 'react'
// giving it its own css file
import './Header.css'

// using material ui(which is pretty dope)
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    // to update the number in the basket, present in the header, as soon as we click on add item to cart
    const [ {basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if(user) {
            auth.signOut();
        }
    }


    return (
        <div className='header'>
        {/* creating links back and forth */}
            <Link to= "/">
                {/* adding an image to our header */}
                <img
                    className='header__logo'
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </Link>

            {/* adding the search bar */}
            <div className='header__search'>
                <input
                    className="header__searchInput"
                    type="text"
                />
                <SearchIcon
                className="header__searchIcon" />
            </div>

            {/* the rightmpst area of our header where some comman commands are present */}
            <div className='header__nav'>
                <Link to={!user && "/login"}>
                    <div className='header__option' onClick={handleAuthentication}>
                        <span
                        className='header__optionLineOne'>
                           Hello, {user ? user.email : 'Guest'}
                        </span>

                        <span
                        className='header__optionLineTwo'>
                        {/* ternary operator to tell that if user exists, say sign out otherwise say sign in */}
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                
                <div className='header__option'>
                    <span
                    className='header__optionLineOne'>
                        Returns
                    </span>
                    <Link to= "/orders">
                    <span
                    className='header__optionLineTwo'>
                        & Orders
                    </span>
                    </Link>

                </div>

                <div className='header__option'>
                    <span
                    className='header__optionLineOne'>
                        Your
                    </span>

                    <span
                    className='header__optionLineTwo'>
                        Prime
                    </span>

                </div>

                <Link to ='/checkout'>
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        {/* we have applied 2 different classes */}
                        <span className="header__optionLineTwo header__basketCount">
                            {basket?.length}
                            {/* ? means optional chaining. basically if there is any error, app wont cras but the error would vbe gracefully handled */}
                        </span>
                    </div>
                </Link>



            </div>
            

        </div>
    )
}

export default Header
