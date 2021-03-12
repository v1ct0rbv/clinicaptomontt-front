import React,{useEffect,lazy,Suspense} from 'react'
import {Switch,Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from './img/loader2.gif'


import {auth} from './firebase'
import {useDispatch} from 'react-redux'

//using lazy
const Home = lazy(() => import('./pages/Home'))
const Header = lazy(() => import('./components/nav/Header'))
const Login = lazy(() => import('./pages/auth/Login'))






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
    <Suspense fallback={
      <div className='col text-center p-5'>
        <img src={Spinner} alt='loader'/>
      </div>
    }>
    <Header />
    <ToastContainer/>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path="/agenda" component={Home} />
    </Switch>
    </Suspense>
  );
}

export default App;
