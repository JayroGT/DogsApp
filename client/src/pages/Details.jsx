import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { getById} from "../redux/actions";
import Card from "../components/card/Card";

export const Details = () =>{

    const {id} = useParams()
    const dogDetail = useSelector(state => state.dogsId) 
    const dispatch = useDispatch()
   // const [loading, setLoading] = useState()    
    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id])

console.log()

    return (
        <> {
            dogDetail && (
                <Card 
                id={dogDetail.id} 
                weightMin={dogDetail.weightMin} 
                weightMax={dogDetail.weightMax} 
                heightMin={dogDetail.heightMin}  
                heightMax={dogDetail.heightMax}
                image = {dogDetail.image} 
                temperament = {Array.isArray(dogDetail.temperament) ? dogDetail.temperament.join(", ") : ''}
                key={dogDetail.id} 
                dogs={dogDetail} 
                name={dogDetail.name} 
                /> 
            )}
        </>
    )
}