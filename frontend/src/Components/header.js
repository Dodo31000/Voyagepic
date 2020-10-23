import React from 'react';
import { Link } from "react-router-dom";

const Header = ({openMenuClick, item}) =>(
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

        {/*<Link to={`/${item}`}>
            <h1>VoyagePic</h1>
        </Link>*/}

        <Link to='login'>
            <h1>VoyagePic</h1>
        </Link>
    </header>
)

export default Header;