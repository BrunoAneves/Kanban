import './style.module.css'
import Task from './components/Task/Task'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Cadastro from './components/Cadastro'

const App = () => {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="task" element={<Task />} />
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App