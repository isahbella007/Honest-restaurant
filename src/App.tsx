import Home from './Pages/Home/Home'
import Menu_Detail from './Pages/Menu-Detail/Menu-detail'
import Menu from './Pages/Menu/Menu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home/>}></Route>
      <Route path='/menu' element = {<Menu/>}></Route>
      <Route path='/menu-detail/:id' element= {<Menu_Detail/>}></Route>
    </Routes>
  </BrowserRouter>
  )

}

export default App
