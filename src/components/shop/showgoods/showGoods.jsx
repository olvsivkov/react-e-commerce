import React, {useContext} from "react"
import  { CustomContext } from '../shop'
import Gooditem from "./goodItem/gooditem";
import './showGoods.css';

function ShowGoods() {
  const {goods} = useContext(CustomContext)
  return (
    <div className='items-wrapper'>
      {goods.map(good => (
        <Gooditem key={good.id} {...good}/>
      ))}
    </div>
  );
}

export default ShowGoods;