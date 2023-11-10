import React from "react";
import { SearchBar } from "../../components/searchbar/SearchBar";
import Cards from "../../components/cards/Cards";
import './Home.css'
import { FilterTemp } from "../../components/filtertemp/FilterTemp";
import {FilterBySite} from "../../components/FilterBySite/FilterBySite";
import {SortByName} from "../../components/SortByName/SortByName";
import {SortByWeight} from "../../components/SortByWeight/SortByWeight";
import { Link } from "react-router-dom";

export default function Home (){
    
    
        
    return <>
        <div id="home-component">

            <div className="buttCreate">
                <Link to="/create">
                <button > Crear perro </button>
                </Link>
            </div>
        <div className = "contentSearch">
            <SearchBar />
        </div>
        <div className="contfilter">
        <div className= "filter">
            <SortByName />
            <SortByWeight />
            <FilterBySite />
        </div>
        </div>
        <div>
            <FilterTemp />
        </div>
            <section>
                <div className="card-container">
                        <Cards className="card"/>
                </div>
            </section>
        </div>
        </>
};