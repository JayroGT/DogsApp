import { useDispatch} from "react-redux";
import { filterBySite } from "../../redux/actions";
import { useState } from "react";
import style from './filterbysite.module.css';
export const FilterBySite = () => {
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState("")

    const handleFilterChange = (event) => {
      setSelectedOption(event.target.value)   
    }
  
    const handleFilterClick = () => {
      if (selectedOption === "api") {
        dispatch(filterBySite(false))
      } else if (selectedOption === "DB") {
        dispatch(filterBySite(true))
      }
    }
  
    return (
      <div className={style.contFilt}>
        <label htmlFor="filterSelect"></label>
        <select id="filterSelect" value={selectedOption} onChange={handleFilterChange}>
          <option value="default">Filter by Site</option>
          <option value="api">API</option>
          <option value="DB">Base de Datos</option>
        </select>
        <button onClick={handleFilterClick} className={style.butt}>Filter</button>
      </div>
    )
}

