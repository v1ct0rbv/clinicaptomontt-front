import React,{useEffect,useState} from 'react'
import {listAgendados,readAgenda,removeAgenda} from '../../functions/agenda'
import {Link} from 'react-router-dom'

import Spinner from '../../img/loader2.gif'
import {toast} from 'react-toastify'
import ReactEcharts from "echarts-for-react";
import {Checkbox } from 'antd'



const consultaState = {
    tipoConsulta:'CONSULTA MÉDICA PRESENCIAL',
    estado:["Confirmado","Atendido ","Presentado","Citado"]
}




const AgendaDetail = ({match}) => {

    const [agendados2,setAgendados2] = useState([])
    const [agendados,setAgendados] = useState([])
    const [loading,setLoading] = useState(false)
    const [consulta,setConsulta] = useState(consultaState)
    const [coefP,setCoefP] = useState(6)
    const {tipoConsulta,estado} = consulta


    
    const {id} = match.params

    useEffect(() =>{
        loadAgendados()
    },[])


    const loadAgendados = () =>{
        readAgenda(id).then(res =>{
            setAgendados(res.data.datos)
        })
    }
   

    



    //Valores unicos de un array
    const uniqueValues = (array) => {
        return [...new Set(array)]
    }
    
    
    //variables eje x
    var fechasP = uniqueValues(agendados.map(c =>{
        return c['Fecha']
    }))
    

    //Variables eje y
    var hours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
        '11:30', '12:00', '12:30','13:00','13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00', '18:30', '19:00', '19:30','20:00','20:30','21:00','21:30','22:00'];
    
    
    //Ver en que posicion esta cada valor en arra
    const isInPosition = (x,array) =>{
        for( var i=0; i < array.length;i++){
            if(x === array[i]) return i
        }
    }
    //areas agendados
    var dataArea = uniqueValues(agendados.map(c =>{
        return c['Area']
    }))

    //estados agendados
    var dataEstado = uniqueValues(agendados.map(c=>{
        return c['Estado']
    }))

    //Obtener dia y hora de cada variable
    var datos = agendados.filter(
    function(s){
        return estado.indexOf(s['Estado']) !== -1 && s['Area'].includes(tipoConsulta)
    }
    ).map(c => {

            var hr = c['Hora'].substring(0,2)
            var min = c['Hora'].slice(-2)
            
            var x = isInPosition(c['Fecha'],fechasP)
            var y=0
            if(hr === '08' && Number(min)<30){
                y = isInPosition('08:00',hours)
                return x+";"+y
            }
            if(hr === '08' && Number(min)>=30){
                y = isInPosition('08:30',hours)
                return x+";"+y
            }
            if(hr === '09' && Number(min)<30){
                y = isInPosition('09:00',hours)
                return x+";"+y
            }     
            if(hr === '09' && Number(min)>=30){
                y = isInPosition('09:30',hours)
                return x+";"+y
            }
            if(hr === '10' && Number(min)<30){
                y = isInPosition('10:00',hours)
                return x+";"+y
            }
            if(hr === '10' && Number(min)>=30){
                y = isInPosition('10:30',hours)
                return x+";"+y
            }
            if(hr === '11' && Number(min)<30){
                y = isInPosition('11:00',hours)
                return x+";"+y
            }
            if(hr === '11' && Number(min)>=30){
                y = isInPosition('11:30',hours)
                return x+";"+y
            }
            if(hr === '12' && Number(min)<30){
                y = isInPosition('12:00',hours)
                return x+";"+y
            }
            if(hr === '12' && Number(min)>=30){
                y = isInPosition('12:30',hours)
                return x+";"+y
            }
            if(hr === '13' && Number(min)>=30){
                y = isInPosition('13:30',hours)
                return x+";"+y
            }
            if(hr === '14' && Number(min)>=30){
                y = isInPosition('14:30',hours)
                return x+";"+y
            }
            if(hr === '15' && Number(min)>=30){
                y = isInPosition('15:30',hours)
                return x+";"+y
            }
            if(hr === '16' && Number(min)>=30){
                y = isInPosition('16:30',hours)
                return x+";"+y
            }
            if(hr === '17' && Number(min)>=30){
                y = isInPosition('17:30',hours)
                return x+";"+y
            }
            if(hr === '18' && Number(min)>=30){
                y = isInPosition('18:30',hours)
                return x+";"+y
            }
            if(hr === '19' && Number(min)>=30){
                y = isInPosition('19:30',hours)
                return x+";"+y
            }
            if(hr === '20' && Number(min)>=30){
                y = isInPosition('20:30',hours)
                return x+";"+y
            }
            if(hr === '21' && Number(min)>=30){
                y = isInPosition('21:30',hours)
                return x+";"+y
            }
            if(hr === '22' && Number(min)>=30){
                y = isInPosition('22:30',hours)
                return x+";"+y
            }
            if(hr === '13' && Number(min)<30){
                y = isInPosition('13:00',hours)
                return x+";"+y
            }
            if(hr === '13' && Number(min)<30){
                y = isInPosition('13:00',hours)
                return x+";"+y
            }
            if(hr === '14' && Number(min)<30){
                y = isInPosition('14:00',hours)
                return x+";"+y
            }
            if(hr === '15' && Number(min)<30){
                y = isInPosition('15:00',hours)
                return x+";"+y
            }
            if(hr === '16' && Number(min)<30){
                y = isInPosition('16:00',hours)
                return x+";"+y
            }
            if(hr === '17' && Number(min)<30){
                y = isInPosition('17:00',hours)
                return x+";"+y
            }
            if(hr === '18' && Number(min)<30){
                y = isInPosition('18:00',hours)
                return x+";"+y
            }
            if(hr === '19' && Number(min)<30){
                y = isInPosition('19:00',hours)
                return x+";"+y
            }
            if(hr === '20' && Number(min)<30){
                y = isInPosition('20:00',hours)
                return x+";"+y
            }
            if(hr === '21' && Number(min)<30){
                y = isInPosition('21:00',hours)
                return x+";"+y
            }
            if(hr === '22' && Number(min)<30){
                y = isInPosition('22:00',hours)
                return x+";"+y
            }else{
                return x+";"+y
            }


    })

    //Calcular numero de pacientes 
    var result = [...datos.reduce( (m, v) => m.set(v, (m.get(v) || 0) + 1), new Map() )];

    //Calcular numero de pacientes y dividirlos por coef ejecutivos atenciones
    var data2 = result.map(c=>{
        var xy= c[0].split(';')

        return [Number(xy[0]),Number(xy[1]),Math.ceil(c[1]/coefP)]
    })

    //Crear array multidimensional para heatmap de numero pacientes
    var data = result.map(c=>{
        var xy= c[0].split(';')

        return [Number(xy[0]),Number(xy[1]),c[1]]
    })

    //Obtener columna de array
    function getCol(matrix, col){
        var column = [];
        for(var i=0; i<matrix.length; i++){
           column.push(matrix[i][col]);
        }
        return column;
     }

    //valor maximo de pacientes
    var max = getCol(data,2)
    var max_array = Number(Math.max.apply(Math,max))
  
    var max_array_eje = Number(Math.max.apply(Math,getCol(data2,2)))


    //totales por dia
    var diasIndex = uniqueValues(data.map(c =>{
        return c[0]
    }))
    var count = 0
    var totalesPordia = diasIndex.map(d=>{
        var x = Number((data.filter(s => s[0] === d).map(c=>{
            count = Number(c[2]) + count
            return count
        })).slice(-1))
        var fecha = fechasP[d]
        count = 0
        return [fecha,x]
    })

    //data para heatmap
    data = data.map(function (item) {
        return [item[0], item[1], item[2] || '-'];
    });

    //handleChangeSelect
    const handleChangeSelect = (e) => {
        setConsulta({...consulta,[e.target.name]: e.target.value})
    }

    // Consulta estado
    const showEstados = () => dataEstado.map(c => <div key={c}><Checkbox checked={consulta.estado.includes(c)} onChange={handleCheckEstado} className='pb-2 pl-4 pr-4' value={c}>{c}</Checkbox>
    <br/>
    </div>)

    const handleCheckEstado = e =>{
        let inTheState = [...consulta.estado]
        let justChecked = e.target.value
        let foundInTheState = inTheState.indexOf(justChecked)

        //if found return -1
        if(foundInTheState === -1){
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState,1)
        }
        setConsulta({...consulta,estado:inTheState})
    }

    //opciones
    var configChart= {
        tooltip: {
            position: 'top'
        },
        grid: {
            height: 'auto',
            top: '5%'
        },
        xAxis: {
            type: 'category',
            data: fechasP,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: hours,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 60,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            range:[0,max_array],
            inRange: {
                color: ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"]
              }
        },
        series: [{
            name: 'Pacientes',
            type: 'heatmap',
            data: data,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    }

    //opciones ejecutivos
    var configChartEjecutivos= {
        tooltip: {
            position: 'top'
        },
        grid: {
            height: 'auto',
            top: '5%'
        },
        xAxis: {
            type: 'category',
            data: fechasP,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: hours,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            range:[0,max_array_eje],
            inRange: {
                color: ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"]
              }
        },
        series: [{
            name: 'Pacientes',
            type: 'heatmap',
            data: data2,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    }
    const ChangePacientes = (e) =>{
        setCoefP(e.target.value)
    }

    
    return (
        <div className='agenda-container mt-3'>
            <Link to='/agenda'><h6 className='text-muted'><i class="fas fa-arrow-left"></i> Volver a agendas</h6></Link>
            <div className='row'>
                <div className='col-md-12'>
                <h1 className='text-muted'>Agendados Clínica Puerto Montt</h1>
                <hr/>
                </div>
                <div className='col-md-9 mt-0 pb-5 mb-5 canvas-container' style={{textAlign:'center'}}>
                    <ReactEcharts
                        option = {configChart}
                    />
                </div>
                <div className='col-md-3 mb-4 mt-5'>
                    <div className='total mb-3'>
                        <h6>Total agendados</h6>
                        <h1>{datos.length}</h1>
                        <hr style={{color: 'white'}}/>
                        <div className='row '>
                            {totalesPordia.length > 0 && 
                            totalesPordia.map(c=>(
                                <>
                                <div className='col-md-12 totalestable' >
                                    <h6> {c[0]}</h6> <h6>{c[1]}</h6>
                                </div>
                                </>
                            ))}
                        </div>
                    </div>
                    {showEstados()}                
                    <select
                    name='tipoConsulta'
                    value={tipoConsulta}
                    className='form-control mt-3'
                    style={{width:'100%'}}
                    onChange={handleChangeSelect}
                    >   
                        
                        <option  value=''>
                            Todo
                        </option>
                        {dataArea.length > 0 && 
                        dataArea.map(c =>(
                        <option key={c} value={c}>
                            {c}
                        </option>
                        ))}
                    </select>
                </div>
                <div className='col-md-12 mt-0 pb-5 mb-5 canvas-container' style={{textAlign:'left'}}>
                    
                    <h3 className='text-muted' >Ejecutivos recomendados por hora</h3>
                    <hr className='text-muted'/>
                    <label className='text-muted' style={{display:'inline-block'}}>Promedio atención ejecutivos por 30 min: </label><br/>
                    <input className="form-control" style={{width:'60px',display:'inline-block',marginLeft:'10px'}} type="name" onChange={ChangePacientes} value={coefP} placeholder="Prom. Atenciónes"></input>
                    <ReactEcharts
                        option = {configChartEjecutivos}
                        
                    />
                </div>
                <div className='col-md-12 mt-5' style={{height:'100px'}}></div>
                
                
            </div>
            
        </div>
    )
}

export default AgendaDetail
