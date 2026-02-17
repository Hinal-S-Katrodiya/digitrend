
import './App.css'
import Home from './Pages/Home'
import Header from './Component/Header'
import { Routes, Route } from "react-router-dom";
import Third from './Component/Third';
import FeatureCards from './Component/Feature';


function App() {
 

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/benefits' element={<FeatureCards />}/>
      </Routes>
      
        
      
      
     
      
    </>
  )
}

export default App
