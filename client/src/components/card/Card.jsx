import React from "react";
import "./Card.css";
import {useHistory, Link} from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react";
import { getDogDetails } from "../../redux/actions";




function Card ({name, weightMin, weightMax, heightMin, heightMax, temperament, id, image}){
    const history = useHistory()
    const currentPath = history.location.pathname
    const dispatch = useDispatch()
    const isDetailPage = currentPath.includes('/home/'); 

    useEffect(() => {
        dispatch(getDogDetails(id));
       
    }, [dispatch, id]);

    return (
        <div className="cardi"> 
        <div className="card-content">
            <div className="foto">
                <img src={image} alt="foto del dog" className="img"/>
            </div>
                <p>Nombre: {name}</p>
                <p>Temperamento: {temperament}</p>
                <p>Peso: {weightMin} - {weightMax}</p>     

            {isDetailPage && (
                <div>
                <p>Altura: {heightMin} - {heightMax}</p>
                




                <Link to={'/home'} >
                    <button>Back To Home</button>
                </Link>
                
                
                </div>

            )}
{!isDetailPage && (
    
    
                <Link to={`/home/${id}`} >
                    
                    <button>
                        Detalle
                    </button>
                </Link>
            )}
        </div>
        </div>
    );
}

export default Card;