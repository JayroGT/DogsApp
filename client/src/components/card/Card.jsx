import React from "react";
import style from "./Card.module.css";
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
        <div className={`${style.cardi} ${isDetailPage ? style.cardiDetails : ''}`}> 
        <div className={style.cardContent}>
            <div className={style.foto}>
                <img src={image} alt="foto del dog" className={`${style.imga} ${isDetailPage ? style.abc : ''}`}/>

            </div>
            <div className={style.alin}>    
                <p>{name}</p>
                <p className={style.letra}>Temperamento: <br/> {temperament}</p>
                <p className={style.letrap}>Peso: <br/>{weightMin} - {weightMax}</p> 
                    

            {isDetailPage && (
                <div>
                <p className={style.letrah}>Altura: <br/>{heightMin} - {heightMax}</p>


                <Link to={'/home'} >
                    <button className={style.showcard}>Back To Home</button>
                </Link>
                
                
                </div>

            )}
            
            </div>
{!isDetailPage && (
    
    
                <Link to={`/home/${id}`} >
                    
                    <button className={style.showcard}>
                        Detalle
                    </button>
                </Link>
            )}
        </div>
        </div>
    );
}



export default Card;