import React,{useEffect,useState} from 'react'
import {scrapingDatos,getAgendados,createAgendados} from '../../functions/agenda'
import ScrapingForm from '../../components/forms/ScrapingForm'
import Spinner from '../../img/loader2.gif'
import {toast} from 'react-toastify'
import ReactEcharts from "echarts-for-react";
import { Select } from 'antd';


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

const agendaCreateDatos = {
    fechas:'',
    datos:[]
}

const Agenda = ({history}) => {
    const [agendadosCreate,setAgendadosCreate] = useState(agendaCreateDatos)
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
            const uniqueValues = (array) => {
                return [...new Set(array)]
            }
            //variables eje x
            var fechasP = uniqueValues(res.data.map(c =>{
                return c['Fecha']
            }))
            let first = fechasP[0]
            let last = fechasP[fechasP.length-1]
            let fechasS = first+'/'+last
            setAgendadosCreate({...agendadosCreate,
                fechas:fechasS,
                datos:res.data,
            })
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
        scrapingDatos(values.user,values.password,values.fechaInicio,values.fechaFin)
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


    const onClickSave = () =>{
        setLoading(true)
        
        createAgendados(agendadosCreate)
        .then(res => {
            setLoading(false)
            history.push('/agenda')
            toast.success(`Agendados guardados exitosamente`)
        })
        .catch( err=> {
            console.log(err)
            if(err.response.status === 400) toast.error(err.response.data)
        }
        )
    }
    return (
        <div className='agenda-container mt-3'>
            <div className='total '>
                <h6>Total agendados</h6>
                
                <h1>{datos.length}</h1>
            </div>
            
            <div className='row mt-5'>
                <h1 className='text-muted'>Agendados Clínica Puerto Montt</h1>
                <hr/>
                <div className='col-md-3 card mb-5'>
                    {loading ? (
                        <div className="loading">
                            <img  src={Spinner} />
                            <h4 className='text-muted '>Cargando....</h4>
                        </div>
                    ):(
                        <>
                        
                        <h3 className='text-muted mt-5'>Agendados desde {values.fechaInicio} hasta {values.fechaFin}</h3>
                        <hr/>
                        <ScrapingForm  values={values} setValues={setValues} handleChange={handleChange} onSubmit={onSubmit}/>
                        <button className='btn btn-success mt-2' type='button' onClick={onClickSave}><i className="far fa-save"></i> Guardar Datos</button>
                        </>
                    )}
                </div>
                <div className='col-md-9 mt-0 pb-5 mb-5 canvas-container' style={{textAlign:'center'}}>
                    <ReactEcharts
                        option = {configChart}
                        
                    />
                </div>
            </div>
            
        </div>
    )
}

export default Agenda
