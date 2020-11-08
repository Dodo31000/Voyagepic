import React from 'react';
import { Link } from "react-router-dom";


const Header = ({ openMenuClick, item, logOut }) =>(
    <header>
        <div className = "logo-nav">
            <Link to="/">
                <div className = "logo"><span></span></div>
            </Link>  
            <nav>
                <div id="burger" onClick = {openMenuClick}>
                <span></span>
                <span></span>
                <span></span>
                </div>

                <ul>  
                    <Link to="/">
                        <li>Accueil<hr/></li>
                    </Link>                        
                    <Link to="/introduce">
                        <li>A propos<hr/></li>
                    </Link>
                    <Link to="/Contact">
                        <li>Contact<hr/></li>
                    </Link>
                </ul>
            </nav>
        </div> 

        <nav style = { { display: `${localStorage.getItem("user")!==null ? 'block' : 'none'}`} }>
            <ul>
                <Link to={`/admin/${item}`}>
                    <li>DataB<hr/></li>
                </Link>

                <Link to="/" onClick={logOut}>
                    <li>Logout<hr/></li>
                </Link> 
            </ul>  
        </nav>

        <Link to='login'>
                <h1>VoyagePic</h1>
        </Link>
    </header>
)

export default Header;