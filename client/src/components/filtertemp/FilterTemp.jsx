import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { filterDogsByTemperament } from '../../redux/actions';
import style from './FilterTemp.module.css';

export const FilterTemp = () => {

  const [selectedTemperament, setSelectedTemperament] = useState("default")
  const [selectedNoneTemperament, setSelectedNoneTemperament] = useState("none")
  const temperaments = useSelector((state) => state.temperaments)
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value
    setSelectedTemperament(selectedValue)
    setSelectedNoneTemperament(selectedValue)
    dispatch(filterDogsByTemperament(selectedValue))
  }

  return (
    <div className={style.cont}>
      <div >
          <select onChange={handleFilterChange} >
            <option value="default">Select Temperament</option>
            <option value="none">None</option>
            {temperaments.map((tem) => (
                <option value={tem.name} key={tem.id}>
                {tem.name}
                </option>
            ))}
          </select>
      </div>
    </div>
  )
}
