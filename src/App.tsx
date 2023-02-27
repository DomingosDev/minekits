import './style/app.css';
import {Setup} from './utils/Setup'
import KitDetail from './components/KitDetail';
import KitList from './components/KitList';
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';

Setup.init();

function App() {

  return (
    <div className="app">
      <BrowserRouter>
      <header className="app_header">
        <Link to="/">
          <h1 className="header">MineKits</h1>
        </Link>
     
      </header>

        <Routes>
          <Route path="/"  element={<KitList/>} ></Route>
          
          <Route path="/kit/:kitId/:name" element={<KitDetail/>}></Route>
          <Route path="/kit/:kitId/costs" element={<KitDetail isCosts={true}/>}></Route>
          <Route path="/kit/:kitId/server" element={<KitDetail isServers={true}/>}></Route>
          <Route path="/kit/:kitId/farming" element={<KitDetail isPerformance={true}/>}></Route>

          <Route path="/kit/:kitId/item/new" element={<KitDetail isNewItem={true}/>}></Route>
          <Route path="/kit/:kitId/item/:itemId/:name" element={<KitDetail isItemDetail={true}/>}></Route>

        </Routes>
      </BrowserRouter>

      <footer className="footer">made with <span className="footer_heart">❤</span> by <a href="https://github.com/DomingosDev" className="footer_link" target="_blank">DomingosDev</a></footer>
    </div>
  );
}

export default App;
