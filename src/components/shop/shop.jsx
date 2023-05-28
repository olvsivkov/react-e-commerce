import { useEffect, createContext, useReducer} from 'react';
import { API_URL} from '../../config';
import { reducer } from './reducer';
import { Preloader } from '../preloader/preloader';
import ShowGoods from './showgoods/showGoods';
import Cart from './cart/cart';
import CartShow from './cart/cartshow/cartshow';
import './shop.css';

export const CustomContext = createContext()

function Shop() {

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        dispatchGetGoods({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatchGetGoods({ type: 'FETCH_ERROR' });
        console.error(error)
      }
    };
    fetchData();
  }, []); 

  // Reducer
  const [state, dispatch] = useReducer(reducer, {isShow: false}); 
  const [stateGetGoods, dispatchGetGoods] = useReducer(reducer, { loading: true, goods: [] });
  const [stateGetOrder, dispatchGetOrder] = useReducer(reducer, {order: []});
  const [stateShowPopup, dispatchShowPopup] = useReducer(reducer, {showPopup: false});
  const [sum, dispatchRundedSum] = useReducer(reducer, 0);

  const { loading, goods } = stateGetGoods;
  const { order } = stateGetOrder
  const { showPopup } = stateShowPopup
 
  const value = {
    goods,
    order,
    showPopup,
    state,
    sum,
    dispatch,
    dispatchGetOrder,
    dispatchShowPopup,
    dispatchRundedSum
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

