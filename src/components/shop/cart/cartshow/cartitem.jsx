import { useContext} from "react";
import { CustomContext } from "../../shop";
import './cartshow.css'



function CartItem(props) {
  const {removeGoodFromBasket, removeOneQuantity, addOneQuantity} = useContext(CustomContext);
  const {id, title, price, quantity} = props


  return(<div className="item-card">
  <div className="collection-item">{title} {price} $</div>
  <div className="btns-add-remove">
    <button onClick={() => removeOneQuantity(id)}>-</button>
    <span className="good-quantity">{quantity}</span>
    <button onClick={() => addOneQuantity(id)}>+</button>
  </div>
  <div className="close-icon-wrapper"><i className="material-icons right close-icons secondary-content" onClick={() => removeGoodFromBasket(id)}>delete_forever</i></div>
  </div>)
}

export {CartItem}