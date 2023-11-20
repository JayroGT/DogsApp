import {Route } from 'react-router-dom';
import Home from './pages/home/Home';
import {Details} from './pages/Details/Details.jsx';
import Form from './components/form/Form.jsx'
import { useDispatch } from "react-redux";
import { useState ,useEffect} from "react";
import { getDogs, dogFilter } from "./redux/actions.js";
import { Loading } from './components/Loading/Loading.jsx';
import { Landing } from './pages/Landing/Landing.jsx';
import './App.css';




function App() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

    useEffect(()=>{
        dispatch(getDogs()).then(()=>{
          setLoading(false)
        })
        dispatch(dogFilter())
    },[dispatch])

if(loading){
  return (
    <div >
      <Loading />
    </div>
  )
}

  return (
    <>
          <Route  exact path="/" component= {Landing} />
          <Route  exact path="/home" component= {Home} />
          <Route path="/home/:id" component={Details} />
          <Route path="/create" component={Form} />
    </>
  );
};

export default App;
