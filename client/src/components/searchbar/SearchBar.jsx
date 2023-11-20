import React , {useState} from 'react'
import { useDispatch } from "react-redux"
import { filterName } from '../../redux/actions'
import style from './SearchBar.module.css'

export const SearchBar = () => {

const [
    dogs, 
    setDogs
] = useState("")


const dispatch = useDispatch()    

const HandleChange = (e) => {
    setDogs(e.target.value)
}
const HandleSubmit = (e) => {
    e.preventDefault() 
    dispatch(filterName(dogs))
    setDogs("")
}



  return (
    <div>
        <form onSubmit={(e) => HandleSubmit(e)}>
                <input 
                type = "text" 
                value={dogs}
                name="search" 
                onChange={HandleChange}
                id="search" 
                placeholder="Search for a dog" 
                className={style.SearchBar}
                />

        <div className={style.contButon}>
        <button type="submit" className={style.btnsrch}>
            Buscar
        </button>
        </div>
        </form>
    </div>
  )
  }
