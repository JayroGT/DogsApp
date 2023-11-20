import {  useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createDog, dogFilter } from "../../redux/actions"
import { Link } from "react-router-dom";
import style from './Form.module.css';

const Form = ()=>{

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(dogFilter())
    },[dispatch])

    const temperamentA = useSelector((state)=>state.temperaments)

    const [form, setForm] = useState({
        name: "",
        heightMin: "", 
        heightMax: "", 
        weightMin: "",
        weightMax: "",
        image: "",
        yearsOfLife: "",
        temperament: [],
    })

    const [error, setError] = useState({
        name: "",
        heightMin: "", 
        heightMax: "", 
        weightMin: "",
        weightMax: "",
        image: "",
        yearsOfLife: "",
        temperament: [],
    })

    const validate = (input) =>{
    
      let error = {}
      if (!input.name || input.name.trim().length === 0) {
        error.name = 'El nombre es requerido.';
    } else if (input.name.length > 25) {
        error.name = 'El nombre debe tener máximo 25 caracteres.';
    } else if (!input.name.match(/^[a-zA-Z]+$/)) {
        error.name = 'Solo se permiten letras y no se permiten espacios al final.';
    } else {
        error.name = null};

  // ***************************************************************************************
      
      if(input.image.length > 0 && !input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)){
         error.image = 'Debe ser una URL'
      } else error.image = null
      
      if(input.heightMin > 100 || input.heightMin < 0){
         error.heightMin = 'Debe ser entre 0 a 100'
      }else error.heightMin = null

      if(input.heightMax > 100 || input.heightMax < 0){
        error.heightMax = 'Debe ser entre 0 a 100'
      }else if (input.heightMax < input.heightMin){
        error.heightMax = 'Debe ser mayor a la altura minima'
      } else {error.heightMax = null}
 
      if(input.weightMin > 100 || input.weightMin < 0){
        error.weightMin = 'Debe ser entre 0 a 100'
      }else error.weightMin = null

      if(input.weightMax > 100 || input.weightMax < 0){
        error.weightMax = 'Debe ser entre 0 a 100'
      }else if(input.weightMax < input.weightMin){
        error.weightMax = 'Debe ser mayor al peso minimo'
      }else {error.weightMax = null}

      if(input.yearsOfLife < 100 || input.yearsOfLife < 0){
        error.yearsOfLife = 'Debe ser menor a 100 años y mayor a 0'
      }else error.yearsOfLife = null

      if(input.temperament && input.temperament.length === 0){
         error.temperament = 'Debes elegir un temperamento como minimo'
      } else error.temperament = null
      return error
 }

    const handlerChange = (event) => {
        const property = event.target.name
        const value = event.target.value
        setForm({...form, [property]: value})
        setError(validate({...form, [property]: value}))
    }
    const handlerSelect = (event) => {
        const selectedTemperamentName = event.target.value
        const selectedTemperament = temperamentA.find(
          (temperament) => temperament.name === selectedTemperamentName
        )
        if (selectedTemperament) {
          if (!form.temperament.includes(selectedTemperament.name)){
          const updatedtemperament = [...form.temperament, selectedTemperament.name]
          setForm({ ...form, temperament: updatedtemperament })
          setError(validate({...form, temperament: updatedtemperament}))}
        }
    }

    const handlerSubmit = (event) => {
        event.preventDefault()
        if (error.name === null && error.heightMin === null && error.heightMax === null && error.weightMin === null && error.weightMax === null && error.temperament === null && error.image === null) {
            dispatch(createDog(form))
            alert("Dog Created!")
            setForm({
                name: "",
                heightMin: "",
                heightMax: "", 
                weightMin: "",
                weightMax: "",
                yearsOfLife: "",
                image: "",
                temperament: [],
            })
        } else {alert("Datos erroneos, ingrese un dato correcto.")}
    } 

    const handlerDelete = (event) => {
        event.preventDefault()
        const temperDelete = event.target.value
        setForm({...form, temperament: form.temperament.filter((t) => t !== temperDelete)})
    }

    const uniqueTemperaments = [...new Set(temperamentA.map(temperament => temperament.temperament))];
    
    return (
      <div>
        <div className={style.butBack}>
                <Link to="/Home">
                <button > Volver </button>
                </Link>
            </div>
      
      <div className={style.all}>
        
        <div className={style.cardo}>
              <div className={style.cardheader}>
                  <h2 className={style.textheader}>Crear perro</h2>
              </div>
        <div className={style.cardbody}>
            <form onSubmit={(e) => {handlerSubmit(e)}} className={style.formu} >   
                <div className={style.formgroup} >
                    <div className={style.uno}>
                        <label htmlFor="name">Nombre: </label>
                        <input type="text" value={form.name} onChange={(e) => {handlerChange(e)}} name="name"/>
                    </div>
                    <div className={style.err}>
                          {error.name && (<p>{error.name}</p>)}
                    </div>
                </div>
                
                <div >  
                  <div >
                    <div className={style.formgroup}>
                      <div className={style.uno}>
                            <label htmlFor="heightMin" >Altura min: </label>
                            <input type="number" value={form.heightMin} onChange={(e) => {handlerChange(e)}} name="heightMin" />
                      </div>
                    </div>
                    <div className={style.err}>
                      {error.heightMin && (<p>{error.heightMin}</p>)}      
                    </div>          
                  </div>
                  <div className={style.formgroup}>
                    <div className={style.uno}>
                      <label htmlFor="heightMax" >Altura max: </label>
                      <input type="number" value={form.heightMax} onChange={(e) => {handlerChange(e)}} name="heightMax" />
                    </div>
                    </div >
                    <div className={style.err}>
                      {error.heightMax && (<p >{error.heightMax}</p>)}
                      </div> 
                  </div>

                <div >
                  <div>
                    <div className={style.formgroup}>
                    <div className={style.uno}>
                      <label htmlFor="weightMin" >Peso min: </label>
                      <input type="number" value={form.weightMin} onChange={(e) => {handlerChange(e)}} name="weightMin" />
                    </div>
                    </div>
                      <div className={style.err}>
                        {error.weightMin && (<p>{error.weightMin}</p>)}
                      </div>
                  </div>
                  <div >
                    <div className={style.formgroup}>
                    <div className={style.uno}>
                      <label type="text" htmlFor="weightMax" >Peso max:</label>
                      <input type="number" value={form.weightMax} onChange={(e) => {handlerChange(e)}} name="weightMax" />
                    </div>
                    </div>
                      <div className={style.err}>
                        {error.weightMax && (<p>{error.weightMax}</p>)}
                      </div>
                  </div>
                </div>
            
                <div className={style.formgroup}>
                     <div className={style.uno}>
                    <label type="text" htmlFor="yearsOfLife">Años de vida: </label>
                    <input type="text" value={form.yearsOfLife} onChange={(e) => {handlerChange(e)}} name="yearsOfLife"/>
                    </div>
                    <div>
                       <div className={style.err}>
                         {error.yearsOfLife && (<p>{error.yearsOfLife}</p>)}
                        </div>
                    </div>
                </div>

                <div className={style.formgroup}>
                <div className={style.uno}>
                    <label type="text" htmlFor="image">Imagen: </label>
                    <input type="text" value={form.image} onChange={(e) => {handlerChange(e)}} name="image"/>
                </div>
                    <div>
                       <div className={style.err}>
                      {error.image && (<p>{error.image}</p>)}
                      </div>
                    </div>  
                </div>

                  <div  className={style.divfinal}>
                    <label type="text" htmlFor="temperament" className={style.wawa} >Temperamentos: </label>
                    <select onChange={(e) => {handlerSelect(e)}} name="temperament" className={style.wawa}>
                      <option value="">Select at least one</option>
                      {temperamentA && temperamentA.map((temperament) => {
                        return (
                          <option key={temperament.id} value={temperament.name} >
                            {temperament.name} 
                          </option>
                        )
                      })}
                    </select>
                    </div>
                    <div className={style.err}>
                    {error.temperament && (<p>{error.temperament}</p>)}
                    </div>
                <div className={style.contli}>       
                <div className={style.lista} >
                  <ul id="temperament" className={style.listo}>
                    {form.temperament.map((temperamentId) => {
                      const selectedTemperament = temperamentA.find(
                        (temperament) => temperament.name === temperamentId
                        )
                        if (selectedTemperament) {
                          return (
                            <li key={selectedTemperament.id}> {selectedTemperament.name}
                            <button onClick={handlerDelete} value={selectedTemperament.name} className="btnTem">X</button>
                            </li>
                            )
                      } 
                      return null
                    })}
                  </ul>
                </div>
                </div> 
                <button type="submit" className={style.btn}>CREATE</button>

            </form>
      </div>
    </div>
    </div>
    </div>
    )
}

export default Form