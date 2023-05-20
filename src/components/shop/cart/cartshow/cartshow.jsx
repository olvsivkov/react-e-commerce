import { useContext, useState, useEffect } from "react";
import { CustomContext } from "../../shop";
import { CartItem } from "./cartitem";
import './cartshow.css'

function CartShow() {
  const [sum, setSum] = useState(0)
  const { isBasketShow, order, handleBasketShow} = useContext(CustomContext);

/*
В этом useEffect идет суммирование цен товаров, добавленных пользователем в корзину. Создается пустой массив prices и в него добавляются значения цены каждого добавленного в order (в корзину) товара. Вначале идет проверка на колличество одного и того же товара в корзине. Если пользователь добавил товар в корзину, а затем увеличил количество этого товара, то количество товара item.quantity * на цену и выдается в графе "Всего:" 
Затем получившаяся сумма добавляется в массив prices.
В это же время как только массив prices начал заполняться элементы массива складываются друг с другом и получившаяся сумма округляется до 2 цифр после запятой и выводится в строку "Всего:"  
*/
  useEffect(() => {
    const prices = order.map(item => {
      if (item.quantity > 1) {
        return item.price * item.quantity ;
      } else {
        return item.price;
      }
    });
  
    const sum = prices.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  
    const roundedSum = sum.toFixed(2);
  
    setSum(roundedSum);
  }, [order]);



  if (isBasketShow) {
    if (order.length) {
      return <> 
      <div className="collection cart-list">
        <div className="collection-item active">Корзина<i className="material-icons right close-icons" onClick={() => handleBasketShow()}>close</i></div>
        {order.map( (item) => <CartItem key={item.id} {...item}/>)}
        <div className="collection-item active">Всего: {sum} $</div>
      </div>
      </>
    } else {
      return <> 
      <ul className="collection cart-list">
        <li className="collection-item active">Корзина<i className="material-icons right close-icons" onClick={() => handleBasketShow()}>close</i></li>
        <li className="collection-item ">Корзина пуста</li>
      </ul>
      </>;
    }
  } else {
    return null;
  }
}

export default CartShow;