import React, {useState,useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {Button} from 'antd'
import { useSelector } from 'react-redux'
import Logo from '../../img/logo.png'
import {useDispatch} from 'react-redux'
// import {createOrUpdateUser} from '../../functions/auth'



const Login = ({history}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

    let dispatch = useDispatch()

    
    
    const {user} = useSelector((state)=>({...state}))

    useEffect(() =>{
        if(user && user.token) {history.push('/')}
    },[user,history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email,password)
            console.log(result)
            const {user} = result 
            const idTokenResult = await user.getIdTokenResult()

            dispatch({
                type:'LOGGED_IN_USER',
                payload:{
                    email:user.email,
                    token: idTokenResult.token
                },
            })
            

            setLoading(false)
            history.push('/agenda')
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setLoading(false)
        }
    }


    const loginForm = () => (
    <form onSubmit={handleSubmit}>
        
        <div className='form-group'>
            <input 
            type='email' 
            className='form-control' 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            autoFocus
            placeholder='Correo electronico'
            />
        </div>
        <div className='form-group mt-3 mb-5'>
            <input 
            type='password' 
            className='form-control' 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder='Contraseña'
            />
        </div>

        <Button 
        onClick={handleSubmit}
        type='primary'
        className='mb-3 mt-2'
        block
        shape='round'
        size='large'
        disabled={!email || password.length < 6}
        >Iniciar Sesión</Button>
    </form>)

    return (
        <div className='container-login p-5'>
            <div className='login-card'>
                    {loading ? (
                    <h1 className='text-danger'>Loading ...</h1>
                    ) : (
                        <>
                        <img src={Logo} alt='logo' height='100' style={{margin:'auto'}}/>
                        <h6>Clínica Puerto Montt Agendados</h6>
                        <hr/>
                        <h1>Iniciar sesión</h1> 
                        </>
                    )}
                    {loginForm()}
                    
                    
            </div>
        </div>
    )
}

export default Login
