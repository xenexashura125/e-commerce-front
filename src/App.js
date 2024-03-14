import { useEffect, useState } from 'react';
import './App.css';
// import Forgot from './components/Forgot';
// import Login from './components/Login';
import './scss/auth.scss';
import './scss/navbar.scss';
import './scss/home.scss';
import './scss/shops.scss';
import './scss/checkout.scss';
import './scss/admin.scss';
import './scss/carts.scss';
import './scss/list.scss';
import './scss/card.scss';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom'
import Authentication from './components/Authentication';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Views from './components/Views';
import Shops from './components/Shops';
import AdminSide from './adminside/AdminSide';
import Checkout from './components/Checkout';

function App() {

  const [user,setUser] = useState(null) 

  // useEffect(() => {
  //   const getUser = async () => {
  //     await fetch("http://localhost:7777/auth/login/success",{
  //       method:"GET",
  //       credentials:"include",
  //       headers: {
  //         Accept:"application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true
  //       }
  //     }).then((res) => {
  //       if (res.status == 200) {
  //         return res.json()
  //       }
  //       throw new Error("authentication failed")
  //     }).then(resObject => {
  //       console.log(resObject.user)
  //         setUser(resObject.user)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }

  //   getUser()
  // },[])
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    fetch('http://localhost:7777/auth/getUserByToken', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        if (data.user) {
            // Hide Login and Register links
            
            fetch('http://localhost:7777/auth/get-all-users',{
                method:'GET',
                headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(usersData => {
                console.log(usersData)
                const loggedInUserEmail = data.user.username;
                console.log(loggedInUserEmail)

                const loggedInUser = usersData.users.find(user => user.email === loggedInUserEmail);
                console.log(loggedInUser)
                if (loggedInUser) {
                    setUser(loggedInUser)
                }
            })
            .catch(error => {
                console.error(error);
            });
            localStorage.setItem('userToken', token);
        }
    })
    .catch(error => {
            console.error(error);
    });

  },[])



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home user={user}/>}></Route>
          <Route path='/login' element={<Authentication setUser={setUser}/>}></Route>
          <Route path='/register' element={<Register setUser={setUser}/>}></Route>
          <Route path='/forgot' element={<Forgot/>}></Route>
          <Route path='/cards/:id' element={<Views user={user}/>}></Route>
          <Route path='/shop' element={<Shops user={user}/>}></Route>
          <Route path='/admin' element={<AdminSide/>}></Route>
          <Route path='/checkout' element={<Checkout user={user}/>}></Route>
          {/* <Route path='/men' element={ user?.displayName ? <MenMain user={user}/> : <Authentication setUser={setUser} user={user}/> }></Route> */}
          {/* <Route path='/women' element={ user?.displayName ? <WomenMain user={user}/> : <Login setUser={setUser} user={user}/> }></Route>
          <Route path='/cart' element={ user?.displayName ? <Carts user={user}/> : <Login setUser={setUser} user={user}/> }></Route>
          <Route path='/reset-password/:id' element={<ResetPass/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/products' element={user?.displayName ? <Home user={user}/> : <Login setUser={setUser} user={user}/>}></Route>
          <Route path='/Men' element={user?.displayName ? <MenMain user={user}/> : <Login setUser={setUser} user={user}/>}></Route>
          <Route path='/Women' element={user?.displayName ? <WomenMain user={user}/> : <Login setUser={setUser} user={user}/>}></Route>
          <Route path='/checkout' element={user?.displayName ? <Checkout user={user}/> : <Login setUser={setUser} user={user}/>}></Route>          
          <Route path='/new' element={ user?.displayName ? <NewRelease user={user}/> : <Login setUser={setUser} user={user}/>}></Route>           */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
