import { useContext, useEffect} from "react";
import { CustomContext } from "../../shop";
import { CartItem } from "./cartitem";
import './cartshow.css'


export const stateValue = {}

function CartShow() {
  const {order, state, dispatch, dispatchRundedSum, sum} = useContext(CustomContext);

  useEffect(() => {
    dispatchRundedSum({ type: "CALCULATE_SUM", payload: order });
  }, [order]);


  if (state.isShow) {
    if (order.length) {
      return <> 
      <div className="collection cart-list">
        <div className="collection-item active">Корзина<i className="material-icons right close-icons" onClick={() => dispatch({type: 'isCartShow'})}>close</i></div>
        {order.map( (item) => <CartItem key={item.id} {...item}/>)}
        <div className="collection-item active">Всего: {sum} $</div>
      </div>
      </>
    } else {
      return <> 
      <ul className="collection cart-list">
        <li className="collection-item active">Корзина<i className="material-icons right close-icons" onClick={() => dispatch({type: 'isCartShow'})}>close</i></li>
        <li className="collection-item ">Корзина пуста</li>
      </ul>
      </>;
    }
  } else {
    return null;
  }
}

export default CartShow;