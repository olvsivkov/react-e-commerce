import { useContext } from "react"
import { CustomContext } from "../../shop"
import './gooditem.css'

function Gooditem(props) {
  const {id, image, title, price, description} = props;
  const {addToBasket} = useContext(CustomContext)
  return <div >
    <div className="card">
      <div className="card-image">
        <img id='card-img' className='activator' src={image} alt="product poster"/>
      </div>
      <div className="card-content">
        <span className="card-title">{title}</span>
        <p className='price'>{price} $</p>
      </div>
      <div>
        <button className='btn btn-bye' onClick={()=> addToBasket({id, title, price})}>Купить</button>
      </div>
      <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
      <p>{description}</p>
    </div>
    </div>
</div>
}

export default Gooditem