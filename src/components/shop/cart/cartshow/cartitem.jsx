import { useContext} from "react";
import { CustomContext } from "../../shop";
import './cartshow.css'


function CartItem(props) {
  const {dispatchGetOrder} = useContext(CustomContext);
  const {id, title, price, quantity} = props

  return(<div className="item-card">
  <div className="collection-item">{title} {price} $</div>
  <div className="btns-add-remove">
    <button onClick={() => dispatchGetOrder({ type: 'REMOVE_QANTITY', payload: id })}>-</button>
    <span className="good-quantity">{quantity}</span>
    <button onClick={() => dispatchGetOrder({ type: 'ADD_QANTITY', payload: id })}>+</button>
  </div>
  <div className="close-icon-wrapper"><i className="material-icons right close-icons secondary-content" onClick={() => dispatchGetOrder({ type: 'REMOVE_PRODUCT_FROM_BASKET', payload: id })}>delete_forever</i></div>
  </div>)
}

export {CartItem}