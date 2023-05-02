import axios from "axios";
import { useEffect, useState } from "react";
const useMeal = () => {

  const[MealList, setMealList] = useState<MealList[]>([])
  const[MealIngredient, setMealIngredient] = useState<MealIngredient[]>([])
  const[singleMealDetail, setSingleDetail] = useState<SingleMealDetail | null >(null)

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const getAll = () => {
    axios.get(`${BASE_URL}/listMeals`).then((response) => { 
      setMealList(response.data)
    }).catch((error) => { 
      console.log(error);
    })
  }

  const getAllIngredients = async () => { 
    try{ 
      const response = await axios.get(`${BASE_URL}/listIngredients`)
      setMealIngredient(response.data)
    }catch(error){ 
      console.log(error);
    }
  }

  const getMealDetail = async (id:string | undefined) => { 
    try{ 
      const response = await axios.get(`${BASE_URL}/get/${id}`)
      setSingleDetail(response.data)
    }catch(error){console.log(error);}
  }
  useEffect(() => {
    getAll()
  }, [])

  useEffect(() => { 
    getAllIngredients()
  }, [])

  return{ 
    MealList, 
    MealIngredient, getMealDetail, singleMealDetail
  }
};
export default useMeal;
