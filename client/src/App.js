import {Route } from 'react-router-dom';
import Home from './pages/home/Home';
import {Details} from './pages/Details';
import Form from './components/form/Form.jsx'
import { useDispatch } from "react-redux";
import { useEffect} from "react";
import { getDogs, dogFilter } from "./redux/actions.js";



function App() {
  const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDogs())
        dispatch(dogFilter())
    },[dispatch])

  return (
    <>
          <Route  exact path="/home" component= {Home} />
          <Route path="/home/:id" component={Details} />
          <Route path="/create" component={Form} />
    </>
  );
};

export default App;
