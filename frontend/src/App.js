import axios from 'axios'
import { useEffect, useState} from 'react'
import Registration from './components/auth/registration'
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Registration/>
  )
}

export default App;
