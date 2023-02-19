import './style/app.css';
import {Setup} from './utils/Setup'
import KitDetail from './components/KitDetail';
import KitList from './components/KitList';


import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';

Setup.init();

function App() {

  return (
    <div className="app">
      <header className="app_header">
        <h1 className="header">MineKits</h1>
      </header>

      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<KitList/>} ></Route>
          <Route path="/kit/:kitId/:name" element={<KitDetail/>}></Route>
          <Route path="/item/:kitId/:itemId/:name" element={<KitDetail/>}></Route>
        </Routes>
      </BrowserRouter>

      <footer className="footer">made with <span className="footer_heart">❤</span> by <a href="https://github.com/DomingosDev" className="footer_link" target="_blank">DomingosDev</a></footer>
    </div>
  );
}

export default App;
