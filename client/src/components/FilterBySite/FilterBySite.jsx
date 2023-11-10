import { useDispatch} from "react-redux";
import { filterBySite } from "../../redux/actions";
import { useState } from "react";
import './FilterBySite.css';

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
      <div className="contFilt">
        <label htmlFor="filterSelect"></label>
        <select id="filterSelect" value={selectedOption} onChange={handleFilterChange}>
          <option value="default">Filter by Site</option>
          <option value="api">API</option>
          <option value="DB">Base de Datos</option>
        </select>
        <button onClick={handleFilterClick} className="butt">Filter</button>
      </div>
    )
}

