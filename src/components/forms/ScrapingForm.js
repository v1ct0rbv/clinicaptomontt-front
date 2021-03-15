import React from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';



const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';


const ScrapingForm = ({values,setValues,handleChange,onSubmit}) => {

    const {user,password} = values

    const handleChangeDate = (date,dateString)=> {
        setValues({...values,
            fechaInicio: dateString[0],
            fechaFin:dateString[1]
        })
    }

    var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = dd+'-'+mm+'-'+yyyy;

    return (
        <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col-md-16'>
                        <h2>Descargar datos agendados</h2>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label >Usuario</label>
                            <input 
                            type="text"  
                            name="user" 
                            onChange={handleChange} 
                            value={user} 
                            className="form-control"   
                            placeholder="Enter User"/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" name="password" onChange={handleChange} value={password} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className="form-group">
                            <label >Fechas de agendados</label>
                            <RangePicker
                            style={{width:'100%'}}
                            onChange={handleChangeDate}
                            defaultValue={[moment(today, dateFormat), moment(today, dateFormat)]}
                            format={dateFormat}
                            inputReadOnly
                            />

                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
                <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Descargar datos</button>
            </form>
    )
}

export default ScrapingForm
