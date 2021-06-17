export const initialState = {
    basket: [],
    user: null,
};


// selector
// basically to add up the contents of the basket
// we start of with intiali value of zero and add to amount, price of each item
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0); 


// reducer is an object which is constantly listenig to ur request and depending on the type of request/action
// it performs a snippet of code and updates the data layer
// we use switch case for the various actions
//  ...state I believe means the current state
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state, // RETURN WHATEVER THE original STATE WAS
                basket: [...state.basket, action.item], // change the basket to whatever it was eralier plus the new item added. the item which was associated with the action
            };
        case "EMPTY_BASKET":
            return {
                ...state, 
                basket: [], // change the basket to whatever it was eralier plus the new item added. the item which was associated with the action
            };
        case "REMOVE_FROM_BASKET":
            // finds the first index where that item exists (we starighaway cannot delte from id as then all elemenst with that id would get deleted)
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            
            // storing original basket copy in the variable newbasket
            let newBasket = [...state.basket];
            
            // if item exists
            if(index >= 0)
            {   
                // go to that index and remove 1 element from that index in the list
                newBasket.splice(index,1);
            } else {
                console.warn(
                    'Cant remove product (id : ${action.id}) as it is not in basket!'
                )
            }

            return {
                ...state,
                basket: newBasket,
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user, // change the basket to whatever it was eralier plus the new item added. the item which was associated with the action
            };
        
            // the default case
        default:
            return state;
        
    }
}

export default reducer;