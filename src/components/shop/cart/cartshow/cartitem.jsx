import { useContext } from "react";
import { CustomContext } from "../../shop";
import './cartshow.css'

function CartItem(props) {
  const {removeGoodFromBasket} = useContext(CustomContext);
  const {id, title, price, quantity} = props
  return(<div className="item-card">
  <div className="collection-item">{title} {price}$ количество: {quantity}</div>
  <div className="close-icon-wrapper"><i className="material-icons right close-icons secondary-content" onClick={() => removeGoodFromBasket(id)}>delete_forever</i></div>
  </div>)
}

export {CartItem}

/*
function CartItem(props) {
  const {removeGoodFromBasket} = useContext(CustomContext);
  const {id, title, price, quantity} = props
  return(<li className="collection-item">{title} {price}$ количество: {quantity}<div>
  <i className="material-icons right close-icons secondary-content" onClick={() => removeGoodFromBasket(id)}>delete_forever</i>
  </div></li>)
}
*/