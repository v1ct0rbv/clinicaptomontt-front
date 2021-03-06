import React,{useEffect, Fragment} from 'react'
import {Switch,Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from './img/loader2.gif'


import {auth} from './firebase'
import {useDispatch} from 'react-redux'

//using lazy
import Home from './pages/Home'
import Agenda from './pages/agenda/Agenda'
import AgendaDetail from './pages/agenda/AgendaDetail'
import Header from './components/nav/Header'
import Login from './pages/auth/Login'
import UserRoute from './components/route/UserRoute'

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
      <UserRoute exact path="/agenda" component={Home} />
      <UserRoute exact path="/agenda-update" component={Agenda} />
      <UserRoute exact path="/agenda-detail/:id" component={AgendaDetail} />
    </Switch>
    </Fragment>
  );
}

export default App;
