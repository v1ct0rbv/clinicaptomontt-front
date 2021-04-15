import React,{useEffect,useState} from 'react'
import {listAgendados,readAgenda,removeAgenda} from '../functions/agenda'
import {Link} from 'react-router-dom'

import Spinner from '../img/loader2.gif'
import {toast} from 'react-toastify'
import ReactEcharts from "echarts-for-react";
import { MDBDataTable } from 'mdbreact';
import {Checkbox } from 'antd'


const agendaId = {
    id:''
}

const Home = () => {

    const [agendadosList,setAgendadosList] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() =>{
        loadListAgendas()
        
    },[])

    const data = {
        columns:[
            {
                label:'Fechas agendados',
                field:'fechas'
            },
            {
                label:'Agendados',
                field:'verificacion',
            },
            
            {
                label:'Eliminar agenda',
                field:'eliminar',
            },
        ],
        rows:
        agendadosList.map(c=> (
            {
                fechas:c.fechas,
                verificacion:<Link type="button" className="btn btn-default btn-sm" to={`/agenda-detail/${c._id}`}>Ver agenda</Link>,
                eliminar:<Link type="button" className="btn btn-danger btn-sm" onClick={() => handleRemove(c._id)}>Eliminar</Link>
            }
        ))
    }
    const handleRemove = async(id) => {
        //let answer = window.confirm('¿Esta seguro de eliminar la categoria?')
        //console.log(answer,slug)
        if(window.confirm('¿Esta seguro de eliminar la agenda?')){
            setLoading(true)
            removeAgenda(id)
                .then( res =>{
                    setLoading(false)
                    toast.error(`Agenda eliminada`)
                    loadListAgendas()
                })
                .catch((err) => {
                    if(err.response.status === 400) {
                        setLoading(false)
                        toast.error(err.response.data)
                    }
                })
        }
    }
    

    const loadListAgendas = () =>{
        listAgendados()
        .then(res =>{
            setAgendadosList(res.data)
        }) 
        .catch(err =>{
            console.log(err)
        })
    }

    return (
        <div className='home-body'>
            <div className='container card p-4 mt-3'>
                <h3>Agendas</h3>
                <MDBDataTable
                striped
                bordered
                small
                data={data}
                />
            </div>
        </div>
    )
}

export default Home
