import React,{useEffect, Fragment} from 'react'
import {Switch,Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from './img/loader2.gif'


import {auth} from './firebase'
import {useDispatch} from 'react-redux'

//using lazy
import Home from './pages/Home'
import Header from './components/nav/Header'
import Login from './pages/auth/Login'






const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()

        dispatch({
          type:'LOGGED_IN_USER',
          payload:{
            email:'',
            token:idTokenResult,
          }
        })
      }
    }) 

    return () => unsubscribe()
  },[])


  return (
    <Fragment>
    <Header />
    <ToastContainer/>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path="/agenda" component={Home} />
    </Switch>
    </Fragment>
  );
}

export default App;
