import "./App.css";
import { Registration } from "./components/registration/registration";
import { Login } from "./components/login/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Posts } from "./components/posts/posts";
import { Houses } from "./components/houses/houses";
import { Header } from "./components/header/header";
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
    <>
      <Header />
      <div className="wrapperDiv">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Posts />} />
          <Route path="/houses" element={<Houses />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
