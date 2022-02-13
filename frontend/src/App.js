import axios from 'axios'
import { useEffect, useState} from 'react'

const App = () => {
  const [users, setUsers] = useState([])
  const getData = async() => {
    const res = await axios.get('/users')
    setUsers(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {users.map(u => <h4 key={u._id}>userName : {u.userName}</h4>)}
    </div>
  )
}

export default App;
