import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import Filter from "../../Components/Filter/Filter";
import NavBar from "../../Components/NavBar/NavBar";
import useMeal from "../../Hooks/useMeal";
import "./Menu.css";
import { getFilteredMealList } from "../../util/filterMealList";
import { sortingOptions } from "../../util/sortingOptions";


const Menu = () => {
  const { MealList, MealIngredient } = useMeal();
  const [sortOption, setSortOption] = useState("");
  const [dietOption, setDietOption] = useState("");
  const [minBudget, setMinBudget] = useState("")
  const [maxBudget, setMaxBudget] = useState("")
  const [luckyValue, setLuckyValue] = useState("")
  const [filteredMealList, filteredMealPrices] = getFilteredMealList(dietOption, MealList,MealIngredient, minBudget, maxBudget, luckyValue)
  const [sortedMealList, sortedMealPrices] = sortingOptions(sortOption, filteredMealList, filteredMealPrices)
  useEffect(() => {
    if(luckyValue === ""){
      setLuckyValue("")
    }

  }, [luckyValue])

  useEffect(() => { 
    sortingOptions(sortOption, filteredMealList, filteredMealPrices)
  }, [])

  useEffect(() => {
    getFilteredMealList(dietOption, MealList,MealIngredient, minBudget, maxBudget, luckyValue)
  })

  const handleLuckyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLuckyValue(event.target.value);
  }

  
  
  return (
    <>
      <NavBar></NavBar>
      <div className="explore">
        <h2>Explore Our Menu & Have Fun!</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi sit
          tenetur sint. Ipsum assumenda officiis cumque reiciendis neque enim.
          Aperiam omnis ratione sapiente nesciunt magnam asperiores hic
          consequatur ipsam laborum!
        </p>
      </div>

      <Filter
        onSortChange={(option) => setSortOption(option)}
        onDietChange={(option) => setDietOption(option)}
        onMinBudgetChange={(value) => setMinBudget(value)}
        onMaxBudgetChange={(value) => setMaxBudget(value)}
        onInputChange = {handleLuckyInputChange}
      ></Filter>
      {Array.isArray(sortedMealList) && sortedMealList.filter(Boolean).length ? (
        <div className="card-div">
          {sortedMealList?.map((data: MealList, index: number) => (
            <Card
              key={data.id}
              id={data.id}
              name={data.name}
              ingredients={data.ingredients}
              highestVersionPrice={sortedMealPrices[index][0]}
              lowestVersionPrice={sortedMealPrices[index][1]}
            />
          ))}
        </div>
      ): <div className="card-div">Sorry, there is no menu that matches your need :(</div>}
    </>
  );
};

export default Menu;
