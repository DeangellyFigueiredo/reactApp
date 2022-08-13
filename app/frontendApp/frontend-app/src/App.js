import NavBar from "./components/NavBar";
import './App.css'
//import api from './config/configApi';
import {BrowserRouter as Router, Routes,
   Route} from 'react-router-dom'
import Home from './pages/Home'
import Politicas from './pages/Politicas'
import Relatorio from './pages/Relatorio'

function App() {
   
    return (
        <>
          <Router>
            <NavBar/>
            <Routes>
              <Route path ='/'  element={<Home/>}/>
              <Route path ='/relatorio'   element={<Relatorio/>}/>
              <Route path ='/politicas'   element={<Politicas/>}/>
            </Routes>
          </Router>

        </>
    
    );
  }

  export default App;
 