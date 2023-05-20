import { useState, useEffect, createContext } from 'react'
import { API_URL} from '../../config'
import  ShowGoods from './showgoods/showGoods';
import { Preloader } from '../preloader/preloader';
import Cart from './cart/cart';
import CartShow from './cart/cartshow/cartshow';
import './shop.css'

export const CustomContext = createContext('Already no have context!')

function Shop() {

  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState([])
  const [isBasketShow, setBasketShow] = useState(false)
  const [showPopup, setShowPopup] = useState(false);

  function addOneQuantity(id){ // !!!!
    setOrder(prevState =>
      prevState.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      })
    );
  }

  function removeOneQuantity(id){ //!!!!
    setOrder(prevState =>
      prevState.map(item => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  }

  useEffect(
    function getGoods(){
      try {
        fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          data && setGoods(data)
          setLoading(false)
        })
      }
      catch(err){
        console.error(err)
      }
    }, []
  )

  useEffect(() => {
    let timeoutId;
    if (showPopup) {
      timeoutId = setTimeout(() => {
        setShowPopup(false);
      }, 700);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showPopup]);

  const removeGoodFromBasket = (id) => {
    setOrder(order.filter(good => good.id !== id))
  } 

  const handleBasketShow = () => {
    !isBasketShow ? setBasketShow(true):setBasketShow(false)
  }

  /*
  Функция addToBasket принимает в аргументы объекты, которые выбрал пользователь. Они добавляются в пустой массив argArray и затем начинают добавлятся в newOrder через forEach. Если ID найден только один раз, то значение quantity устанавливается = 1 и объект добавляется в массив newOrder, если ID найден повторно, то срабатывает return.
  */

  const addToBasket = (arg) => {
    const argArray = []
    const argArrayGoods = [arg, ...argArray]
    const newOrder = [...order];
  
    argArrayGoods.forEach((item) => {
      const index = newOrder.findIndex((orderItem) => orderItem.id === item.id);
  
      if (index < 0) {
        newOrder.push({ ...item, quantity: 1 });
        setShowPopup(true);
      } else {
        return
      }
    });
  
    setOrder(newOrder);
  };

  const value = {
    goods,
    addToBasket,
    order,
    handleBasketShow,
    isBasketShow,
    removeGoodFromBasket,
    addOneQuantity,
    removeOneQuantity,
    showPopup
  }

  return ( 
    <CustomContext.Provider value={value}>
      <div className='main-section container content'>
        <Cart/>
        <CartShow/>
        {loading ? <Preloader/> : <ShowGoods/> }
      </div>
    </CustomContext.Provider>
  )
}

export {Shop}

