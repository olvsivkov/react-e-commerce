import './preloader.css'

export function Preloader() {
  return <div className='position-centre'>
      <div className="progress">
          <div className="indeterminate"></div>
      </div>
    </div>
}