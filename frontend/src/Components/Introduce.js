import React from 'react';
import '../scss/intro.scss';
import { Link } from "react-router-dom";

const Introduce = () => (
    <div className="intro">
        <div className="intro-container">
            <div className="sub-intro">
                <h1>Bonjour !</h1>
                <p>
                    Je suis <strong>Photographe</strong> amateur. Amoureuse de la nature, je profite souvent de mes randonnées en montagnes pour capturer les superbes paysages qui s'offrent à moi.
                J'ai eu aussi la chance de voyager dans de magnifiques pays dont j'ai tenté de rendre la beauté à travers mon objectif. Je shoote avec un réflexe Nikon en manuel et retouche en postprod les clichés sur Lightroom pour magnifier leur rendu.
                <br/><br/>
                Je suis également <strong>Webdesigner</strong> et je suis la conceptrice et développeuse de ce site. J'ai essayé à travers ce projet personnel de site web, de proposer un visuel un peu différent pour un site de photographies en travaillant soigneusement le design. J'ai conçu et développé ce site sur <strong>React.js</strong>.
                </p>  
                <div className = "buttons">
                    <Link to="/">
                        <button><span>&#10094;</span> Retour</button>
                    </Link>
                    <Link to="/contact">
                        <button>Contacter</button>
                    </Link>
                </div> 
            </div>
        </div>
    </div>

)

export default Introduce;