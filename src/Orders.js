import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'

function Orders() {
    // hooks that we are gonna use
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

//   when the component loads
  useEffect(() => {
    // only if user is logged in, show him the data of orders
    if(user) {
        // go to user collection, slecet a particular uid, go to his orders folder, order the list of his orderd in descending order
        // and retrieve its data inside of data variable
        // snapshot basically allows us to retrive and update data and changes in real time
        db 
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({ // set orders is basically going to read out the orders to us
                id: doc.id,
                data: doc.data()
            })))
        ))
    } else {
        setOrders([])
    }

  }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders