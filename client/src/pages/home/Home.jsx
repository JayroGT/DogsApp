import React from "react";
import { SearchBar } from "../../components/searchbar/SearchBar";
import Cards from "../../components/cards/Cards";
import style from './Home.module.css';
import { FilterTemp } from "../../components/filtertemp/FilterTemp";
import {FilterBySite} from "../../components/FilterBySite/FilterBySite";
import {SortByName} from "../../components/SortByName/SortByName";
import {SortByWeight} from "../../components/SortByWeight/SortByWeight";
import { Link } from 'react-router-dom';
import amongdogImage from "../../assets/amongdog.png";



export default function Home (){
    
        
    return <>
        <div >
            <div className={style.headerhome}>
                <div className={style.imagencontent}>
                    <img src={amongdogImage}  alt="Imagen principal" className={style.imagen}/>
                </div>
                <div className={style.buttCreate}>
                <Link to="/create">
                    <button className={style.botoncrear}> Crear perro </button>
                </Link>
                </div>
            </div>
        <div className = {style.contentSearch}>
            <SearchBar />
        </div>
        <div className={style.contfilter}>
        <div className= {style.filter}>
            <SortByName />
            <SortByWeight />
            <FilterBySite />
        </div>
        </div>
        <div>
            <FilterTemp />
        </div>
            <section>
                <div className={style.cardcontainer}>
                        <Cards className={style.card}/>
                </div>
            </section>
        </div>
        </>
};