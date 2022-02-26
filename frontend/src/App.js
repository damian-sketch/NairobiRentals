import axios from 'axios'
import { useEffect, useState} from 'react'
import {Registration} from './components/registration/registration'
import {Login} from './components/login/login'
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from 'react-router-dom';

const App = () => {
  // const [users, setUsers] = useState([])
  // const getData = async() => {
  //   const res = await axios.get('/api/users')
  //   setUsers(res.data)
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Registration/>} />
        <Route exact path='/login' element={<Login/>} />
      </Routes>
        
    </div>
    
  )
}

export default App;
