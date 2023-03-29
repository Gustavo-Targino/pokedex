import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from "./pages/Home";

import Pokemon from './pages/Pokemon';

function App() {

  return (

    <Router>

    <Routes>

    <Route path='/' exact element={<Home/>}></Route>

    <Route path='/pokemon/:name' element={<Pokemon/>}></Route>
    

    </Routes>

    </Router>
  );
}

export default App;
