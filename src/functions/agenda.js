import axios from 'axios'

export const scrapingDatos = async (user,passoword,fechaInicio,fechaHasta,dif) => {
    return await axios.get(`${process.env.REACT_APP_API}/scraping/${user}/${passoword}/${fechaInicio}/${fechaHasta}/${dif}`)
}

export const getAgendados = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/scraping-read`)
}
