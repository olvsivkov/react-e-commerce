import './App.css';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Shop } from './components/shop/shop';


function App() {
  return (
    <div className="App">
      <Header/>
      <Shop/>
      <Footer/>
    </div>
  );
}

export default App;
