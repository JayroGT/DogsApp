import React , {useState} from 'react'
import style from './Pag.module.css';

export const Pag = ({dogs, dogsxPage, pages, prevHandler, nextHandler} ) => {
    const numPage = [];
    for( let i = 1; i <= Math.ceil(dogs/dogsxPage); i++ ){
        numPage.push(i)
    }
    const [selectedNumber, setSelectedNumber] = useState(1)

    const handleClick = (num) =>{
        setSelectedNumber(num)
        pages(num)
    }
    const handlePrevClick = () => {
        if (selectedNumber > 1) {
            setSelectedNumber(selectedNumber - 1);
            prevHandler();
        }
      }
  
      const handleNextClick = () => {
        if (selectedNumber < numPage.length) {
            setSelectedNumber(selectedNumber + 1);
            nextHandler();
        }
      }

  return (    
    <div className={style.pagCont}>
        <div className={style.contS}>
            <button onClick={handlePrevClick} className={style.buttPag}>
            {"🡰"}
            </button>
            <div className={style.pag} >
              {numPage &&
                numPage.map((number) => (
                  <div
                    key={number}
                    onClick={() => handleClick(number)}>
                    {number}
                  </div>
                ))}
            </div>
            <button onClick={handleNextClick} className={style.buttPag}>
            {"🡲"}
            </button>
        </div>
    </div>
  )
}
