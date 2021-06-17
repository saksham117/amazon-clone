// import React, { createContext, useContext, useReducer } from 'react';

// // this statement prepares the data layer
// export const StateContext = createContext();

// // this wraps our app and provides the access ofthe data layer to all of our components
// export const StateProvider = ({ reducer, initialState, children }) => (
//     <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
// );

// // this allows us to pull information from the data layer
// export const useStateValue = () => useContext(StateContext);

import react, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);