import './header.css'

function Header() {
  return   <nav>
    <div className="nav-wrapper nav-bar amber darken-3">
      <span className="brand-logo">Goods</span>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="https://github.com/olvsivkov" target='blank'>Github</a></li>
      </ul>
    </div>
  </nav>
}

export {Header}