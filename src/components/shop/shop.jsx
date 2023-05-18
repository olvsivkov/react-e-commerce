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

  const removeGoodFromBasket = (id) => {
    setOrder(order.filter(good => good.id !== id))
  } 

  const handleBasketShow = () => {
    !isBasketShow ? setBasketShow(true):setBasketShow(false)
  }

  /*
  Функция addToBasket принимает в аргументы объекты, которые выбрал пользователь. Они добавляются в пустой массив argArray и затем начинают добавлятся в state order через forEach. Если ID объектов одинаковое, то добавляется только один объект и у него увеличивается значение quantity на столько раз, сколько одинаковых ID было обнаружено. Если ID найден только один раз, то значение quantity устанавливается = 1 
  */

  const addToBasket = (arg) => {
    const argArray = []
    const argArrayGoods = [arg, ...argArray]
    const newOrder = [...order];
  
    argArrayGoods.forEach((item) => {
      const index = newOrder.findIndex((orderItem) => orderItem.id === item.id);
  
      if (index >= 0) {
        newOrder[index].quantity += 1;
      } else {
        newOrder.push({ ...item, quantity: 1 });
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
    removeGoodFromBasket
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

