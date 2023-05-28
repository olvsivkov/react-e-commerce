export function reducer(state, action) {
  switch (action.type){
    // показать / скрыть корзину
    case 'isCartShow':
      return { isShow: !state.isShow };

    // вызов fetch
    case 'FETCH_SUCCESS': 
      return {
        loading: false,
        goods: action.payload,
      }
    case 'FETCH_ERROR': 
      return {
        loading: true,
        goods: [],
      }
    
    // add product to basket
    case 'ADD_TO_BASKET':
      const argArray = []
      const argArrayGoods = [action.payload, ...argArray]
      const newOrder = [...state.order];
        
      argArrayGoods.forEach((item) => {
        const index = newOrder.findIndex((orderItem) => orderItem.id === item.id);
      
        if (index < 0) {
          newOrder.push({ ...item, quantity: 1, showPopup: true });
            
        } else 
          return
      });
      return {order: newOrder };

    // add or remove quantity
    case 'ADD_QANTITY':
      return {
        ...state,
        order: state.order.map(item => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        })
      };
    case 'REMOVE_QANTITY':
      return {
        ...state,
        order: state.order.map(item => {
          if (item.id === action.payload && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
      };
    

    // расчет общей суммы товаров
    case "CALCULATE_SUM":
      const prices = action.payload.map((item) => {
        if (item.quantity > 1) {
          return item.price * item.quantity;
        } else {
          return item.price;
        }
      });
  
      const sum = prices.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
  
      const roundedSum = sum.toFixed(2);
  
      return roundedSum;

    // remove good from basket

    case 'REMOVE_PRODUCT_FROM_BASKET':
      return {
        ...state,
        order: state.order.filter(good => good.id !== action.payload)
      }

    // SHOW POPUP

    case 'SHOW_POPUP':
      return { ...state, showPopup: true };

    case 'CLOSE_POPUP':
      return { ...state, showPopup: false };

    default:
      return state
  }
}