import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Header = () => {

    let {user} =  useSelector((state) => ({...state}))

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark navCli"aria-label="Fourth navbar example">
            <div className="container-fluid">
                <p className="navbar-brand" ><img  alt='logo' src="https://clinpmontt.cl/wp-content/uploads/2020/02/logo-clinica-puertomontt.png" style={{height:'80px'}} /></p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    {user && (
                        <li className="nav-item">
                            <Link className="nav-link active"  to="/agenda">Agenda</Link>
                        </li>
                    )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
