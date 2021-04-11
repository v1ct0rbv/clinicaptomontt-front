import axios from 'axios'

export const scrapingDatos = async (user,passoword,fechaInicio,fechaHasta,dif) => {
    return await axios.get(`${process.env.REACT_APP_API}/scraping/${user}/${passoword}/${fechaInicio}/${fechaHasta}`)
}

export const getAgendados = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/scraping-read`)
}

export const createAgendados = async (agenda) => {
    return await axios.post(`${process.env.REACT_APP_API}/scraping-create`,{agenda})
}
