import React, { useState } from "react";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import style from "./Cards.module.css";
import { Pag } from "../paginado/Pag";


function Cards (){
    
const dogs = useSelector((state)=> state.dogs)
const [dogsxPage] = useState(8)
const [refreshPage, setRefreshPage] = useState(1)
const lastDog = refreshPage * dogsxPage;
const firstDog = lastDog - dogsxPage;

let currentDog = dogs.slice(firstDog, lastDog);
let index = Math.ceil(dogs.length/dogsxPage);
const pages = (number) =>{
    setRefreshPage(number)
}  

const nextHandler = () => {
    if (refreshPage >= index) return
    setRefreshPage(refreshPage + 1)
  }

  const prevHandler = () => {
    if (refreshPage === 1) return
    setRefreshPage(refreshPage - 1)
  }

  const firstHandler = () => {
    setRefreshPage(1)
  }

  const lastHandler = () => {
    setRefreshPage(index)
  }

    return (
        <div>
        <div>
            <Pag 
            dogs={dogs.length}
            dogsxPage={dogsxPage}
            pages={pages} 
            nextHandler={nextHandler}
            prevHandler={prevHandler}
            firstHandler={firstHandler}
            lastHandler={lastHandler}
            refreshPage={refreshPage}
            />
        </div>
        <div className={style.content}>
            {
                currentDog.map((dog)=>{
                    return <Card 
                    id={dog?.id} 
                    weightMin={dog?.weightMin} 
                    weightMax={dog?.weightMax} 
                    heightMin={dog?.heightMin}  
                    heightMax={dog?.heightMax}
                    image = {dog?.image} 
                    temperament = {Array.isArray(dog?.temperament) ? dog?.temperament.join(", ") : ''}
                    key={dog?.id} 
                    dogs={dog} 
                    name={dog?.name} 
                    />
                })
            }
        </div>
        </div>
    )
}
export default Cards;