import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  
} from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/HomePage";
import ViewPost from "./Pages/Viewpost";
import CreatePage from "./Pages/Create";
import { useEffect, useContext } from "react";
import { AuthContext } from "./Store/Context";
import axios from "./axios";

function App() {
  const {user,setUser,refresh} =useContext(AuthContext)  
  console.log("REferererr@#@#@#@#",refresh);
  useEffect(() => {
    axios.get('/checkAuth').then((response)=>{
      setUser({login:response.data.logged,details:response.data.details})
      console.log(response.data);
      

    })
    
  }, [refresh])
  axios.defaults.withCredentials = true;



  return (

    <div>
      <Router>

      {
        user.login===false &&
      <Routes>
        <Route path='/' element={<Home/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/view/:id' element={<ViewPost/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/sell' element={<Navigate to={'/login'}/>}/>
      </Routes>
      }

      {
        user.login === true && 
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Navigate to={'/'} />} />
        <Route path='/view/:id' element={<ViewPost/>} />
        <Route path='/signup' element={<Navigate to={'/'}/>} />
        <Route path='/sell' element={<CreatePage/>}/>
      </Routes>
      }
    
    
    </Router>
    </div>
  );
}

export default App;
