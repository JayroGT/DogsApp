import axios from "axios";

import { 
  FILTER_BY_NAME, 
  GET_DOGS, 
  GET_BY_ID, 
  GET_DOG_DETAILS,
  GET_TEMPERAMENTS,
  GET_FILTER_DOGS_BY_TEMPERAMENT,
  CREATE_DOGS,
  FILTER_BY_SITE,
  SORT_BY_NAME,
  SORT_BY_WEIGHT,

} from "./actionTypes";

const REACT_APP_URL = process.env.REACT_APP_URL;

export const filterName = (dogsName) =>{
    return async function (dispatch) {
      try {
        const dog = await axios.get(`http://localhost:3001/dogs?name=${dogsName}`);
        dispatch({
            type:FILTER_BY_NAME , 
            payload:dog.data
        });
      } catch (error) {
          console.error("Error fetching dogs:", error);
        }
    ;
  }
}

export const getDogs = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/dogs`);
        const dogs2 = response.data;
        return dispatch({ 
          type: GET_DOGS, 
          payload: dogs2 
        });
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
  };

export const getById = (id) => {
    return async function (dispatch) {
      try{
        const dogDetail = await axios.get(`http://localhost:3001/dogs/${id}`)
        dispatch({ 
          type:GET_BY_ID, 
          payload: dogDetail.data 
        });
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
};

export const getDogDetails = (dogId) => {
    return async function (dispatch) {
      try {
      // await axios.get(`http://localhost:3001/dogs/${dogId}`).data; 
      return dispatch({
        type: GET_DOG_DETAILS,
        payload: { 
          id: dogId 
        },
      });
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
    };
  };


  export const dogFilter = () => {
    return async function (dispatch) {
      try {
      const temperaments = await axios.get(`http://localhost:3001/temperaments`);
      dispatch({ 
        type: GET_TEMPERAMENTS, 
        payload: temperaments.data 
      });
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
    };
  };


  export const filterDogsByTemperament = (temperament) => {
    return { 
      type: GET_FILTER_DOGS_BY_TEMPERAMENT, 
      payload: temperament 
    };
  };


export const createDog = (payload) =>{
    return async function (dispatch) {
      try {
      await axios.post(`http://localhost:3001/dogs`, payload);
      dispatch({ 
        type: CREATE_DOGS 
      });
    }catch (error) {
      console.error("Error fetching dogs:", error);
    }
    };
  };


  export const filterBySite = (fromDB) => {
    return { 
      type: FILTER_BY_SITE, 
      payload: fromDB 
    };
  };
  
  export const sortByName = (order) => {
    return { 
      type: SORT_BY_NAME, 
      payload: order 
    };
  };
  
  export const sortByWeight = (orderW) => {
    return { 
      type: SORT_BY_WEIGHT, 
      payload: orderW 
    };
  };
