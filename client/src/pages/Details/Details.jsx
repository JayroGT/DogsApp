import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { getById} from "../../redux/actions";
import Card from "../../components/card/Card";
import { Loading } from "../../components/Loading/Loading";
import style from './Details.module.css';

export const Details = () =>{

    const {id} = useParams()
    const dogDetail = useSelector(state => state.dogsId) 
    const dispatch = useDispatch()

   const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getById(id)).then(() =>{
            setLoading(false);
        })
    }, [dispatch, id])

console.log()

if(loading) {
    return <Loading />
}


    return (
        <div className={style.conte}> {
            dogDetail && (
                <Card 
                id={dogDetail?.id} 
                weightMin={dogDetail?.weightMin} 
                weightMax={dogDetail?.weightMax} 
                heightMin={dogDetail?.heightMin}  
                heightMax={dogDetail?.heightMax}
                image = {dogDetail?.image} 
                temperament = {Array.isArray(dogDetail?.temperament) ? dogDetail?.temperament.join(", ") : ''}
                key={dogDetail?.id} 
                dogs={dogDetail} 
                name={dogDetail?.name} 

                /> 
            )}
        </div>
    )
}