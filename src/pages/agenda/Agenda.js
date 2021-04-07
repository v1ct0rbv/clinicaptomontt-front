import React,{useEffect,useState} from 'react'
import {scrapingDatos,getAgendados} from '../../functions/agenda'
import ScrapingForm from '../../components/forms/ScrapingForm'
import Spinner from '../../img/loader2.gif'
import {toast} from 'react-toastify'
import ReactEcharts from "echarts-for-react";
import { Select } from 'antd';
import {Checkbox } from 'antd'


const scrapingData = {
    user:'hgoringpm',
    password:'agenda2020.',
    fechaInicio:'',
    fechaFin:''
}
const { Option } = Select;
const consultaState = {
    tipoConsulta:'CONSULTA MÉDICA PRESENCIAL',
    estado:["Confirmado","Atendido ","Presentado","Citado"]
}


const Agenda = () => {
    const [values,setValues] = useState(scrapingData)
    const [agendados,setAgendados] = useState([])
    const [loading,setLoading] = useState(false)
    const [loadingDatos,setLoadingDatos] = useState(false)
    const [consulta,setConsulta] = useState(consultaState)

    const {tipoConsulta,estado} = consulta

    useEffect(() =>{
        loadAgendados()
    },[])

    const loadAgendados = () => {
        setLoadingDatos(true)
        getAgendados()
        .then(res =>{
            setAgendados(res.data)
            setLoadingDatos(false)
        }) 
        .catch(err =>{
            setLoadingDatos(false)
            console.log(err)
        })
    }

    const handleChange = (e) => {
    
        setValues({...values,[e.target.name]: e.target.value})
    }

    const onSubmit = (e) =>{    
        e.preventDefault()
        setLoading(true)
        scrapingDatos(values.user,values.password,values.fechaInicio,values.fechaFin,days)
        .then(res => {
            setLoading(false)
            toast.success(`Datos cargados`)
            loadAgendados()
            console.log(res.data)
        })
        .catch( err=> {
            setLoading(false)
            console.log(err)
        })
    }

   


    //Valores unicos de un array
    const uniqueValues = (array) => {
        return [...new Set(array)]
    }
    

    //variables eje x
    var fechasP = uniqueValues(agendados.map(c =>{
        return c['Fecha desde']
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
        return c['Área']
    }))

    //estados agendados
    var dataEstado = uniqueValues(agendados.map(c=>{
        return c['Estado']
    }))

    //Obtener dia y hora de cada variable
    var datos = agendados.filter(
    function(s){
        return estado.indexOf(s['Estado']) !== -1 && s['Área'].includes(tipoConsulta)
    }
    
    ).map(c => {

            var hr = c['Hora desde'].substring(0,2)
            var min = c['Hora desde'].slice(-2)
            
            var x = isInPosition(c['Fecha desde'],fechasP)
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
            }


    })

    //Calcular numero de pacientes 
    var result = [...datos.reduce( (m, v) => m.set(v, (m.get(v) || 0) + 1), new Map() )];

    //Crear array multidimensional para heatmap
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

    var options = option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
        }]
    };
    return (
        <div className='agenda-container mt-3'>
            <div className='total '>
                <h6>Total agendados</h6>
                
                <h1>{datos.length}</h1>
            </div>
            <div className='container pt-4 pb-4'>  
                {showEstados()}                
                <select
                name='tipoConsulta'
                value={tipoConsulta}
                className='form-control '
                style={{width:'200px'}}
                onChange={handleChangeSelect}
                >   
                    
                    <option  value=''>
                        Todo
                    </option>
                    {dataArea.length > 0 && 
                    dataArea.map(c =>(
                    <option  value={c}>
                        {c}
                    </option>
                    ))}
                </select>
            </div>
            <hr/>
            <div className='row'>
                <h1 className='text-muted'>Agendados Clinica Puerto Montt</h1>
                <hr/>
                <div className='col-md-3 card'>
                    {loading ? (
                        <div className="loading">
                            <img  src={Spinner} />
                            <h4 className='text-muted '>Descargando datos....</h4>
                        </div>
                    ):(
                        <>
                        
                        <h3 className='text-muted mt-5'>Agendados desde {values.fechaInicio} hasta {values.fechaFin}</h3>
                        <hr/>
                        <ScrapingForm  values={values} setValues={setValues} handleChange={handleChange} onSubmit={onSubmit}/>
                        <button className='btn btn-success mt-3 w-100'>Descargar excel</button>
                        </>
                    )}
                </div>
                <div className='col-md-9 mt-0 pb-5 mb-5 canvas-container' style={{textAlign:'center'}}>
                    <ReactEcharts
                        option = {configChart}
                        
                    />
                </div>
                <div className='col-md-9 mt-0 pb-5 mb-5 canvas-container'>
                        
                    <ReactEcharts
                        option = {options}
                        
                    />
                </div>
            </div>
            
        </div>
    )
}

export default Agenda
