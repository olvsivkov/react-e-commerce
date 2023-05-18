import { useContext } from "react"
import { CustomContext } from "../shop"
import './cart.css'

function Cart(){
  const {order, handleBasketShow} = useContext(CustomContext)
  return(
    <div className="cart blue-grey lighten-4 right" onClick={() => handleBasketShow()}>
      <i className="material-icons">local_grocery_store</i>
      {order ? <span className='quantity'>{order.length}</span> : null}
    </div>
  )
}

export default Cart