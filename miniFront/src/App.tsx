import { BrowserRouter, Route, Routes } from "react-router-dom"
import Failure from './pages/Failure'
import Home from './pages/Home'
import Pending from './pages/Pending'
import Success from './pages/Success'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/success' element={<Success />} />
        <Route path='/pending' element={<Pending />} />
        <Route path='/failure' element={<Failure />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
