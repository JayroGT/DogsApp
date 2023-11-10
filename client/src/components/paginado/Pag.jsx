import React , {useState} from 'react'
import './Pag.css';

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
    <div className='pagCont'>
        <div className='contS'>
        <button onClick={handlePrevClick} className='buttPag'>
        {"🡰"}

        </button>
      <div className='pag' >
        {numPage &&
          numPage.map((number) => (
            <div
              key={number}
              onClick={() => handleClick(number)}
            >
              {number}
            </div>
          ))}
        </div>
        <button onClick={handleNextClick} className='buttPag'>
        {"🡲"}
        </button>
        </div>
    </div>
  )
}
