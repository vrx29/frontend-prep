import './App.css'
import { Route, Routes } from 'react-router-dom'
import Zerodha from './views/Zerodha'
import Home from './views/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zerodha" element={<Zerodha />} />
      </Routes>
    </>
  )
}

export default App
