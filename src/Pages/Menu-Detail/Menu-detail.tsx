import { Link, useParams } from "react-router-dom"
import NavBar from "../../Components/NavBar/NavBar";
import useMeal from "../../Hooks/useMeal";
import { useEffect, useState } from "react";
import "./Menu-detail.css"
const Menu_Detail = () => { 
    const {id} = useParams()
    const {getMealDetail, singleMealDetail} = useMeal()
    const [userChoice , setUserChoice] = useState(false)
    const[selectedIngredientOptions, setSelectedIngredientOption] = useState<Record<string, number>>({})
    const [ingredientBudget, setIngredientBudget] = useState<Record<string, number>>({})
    const [matchingQuality, setMatchingQuality] = useState<Record<string, {name: string, price:number, quality: string}>>({});
    const [allFieldsFilled, setAllFields] = useState(false)
    let totalPrice = 0
    let qualityTotal = 0

    useEffect(() => { 
        getMealDetail(id)
    }, [id])

    useEffect(() => { 
        const filledFields = Object.values(ingredientBudget).filter((budget) => budget !== undefined && budget != 0 && budget.toString() != "NaN" )
        setAllFields(filledFields.length === singleMealDetail?.ingredients.length)
        if(allFieldsFilled == false){setMatchingQuality({})}
    }, [ingredientBudget, allFieldsFilled])
    
    const handleOptionChange = (ingredientName:string, option:number) => {
        setSelectedIngredientOption({
            ...selectedIngredientOptions, 
            [ingredientName]:option
        })
    }
    
    if(singleMealDetail?.ingredients && (singleMealDetail?.ingredients.length == Object.keys(selectedIngredientOptions).length) ) { 
        for(var key_value in selectedIngredientOptions){
            let ingredient_name = key_value
            let selectedOption = selectedIngredientOptions[key_value]

            let ingredient_array = singleMealDetail.ingredients.find((ingr) => {return ingr.name == ingredient_name})
            let quantity_number = ingredient_array!.quantity
            let optionPrice = ingredient_array!.options[selectedOption].price

            if(selectedOption == 0){
                totalPrice += (quantity_number/1000) * optionPrice
                qualityTotal += 30
            }else if(selectedOption == 1){ 
                totalPrice += (quantity_number/1000) * optionPrice + 0.05
                qualityTotal += 20
            }else{ 
                totalPrice += (quantity_number/1000) * optionPrice + 0.10
                qualityTotal += 10
            }
        }
    }
    if(qualityTotal !== 0){
        qualityTotal = qualityTotal/Object.keys(selectedIngredientOptions).length
    }


    const handleQualityCalculation = () => {
        let mq: Record<string, {name: string, price:number, quality: string}> = {}

        singleMealDetail?.ingredients.forEach((ingre) => {
            const {name, options, quantity} = ingre
            const high_price = (quantity/1000) * options[0].price
            const medium_price = (quantity/1000) * options[1].price + 0.05
            const low_price = (quantity/1000) * options[2].price + 0.10

            if(ingredientBudget[name] >= high_price){ 
                mq[name] = {
                    name: options[0].name, 
                    price: options[0].price, 
                    quality: "high"
                }
            }else if(ingredientBudget[name] >= medium_price){ 
                mq[name] = { 
                    name: options[1].name, 
                    price: options[1].price, 
                    quality: "medium"
                }
            }else if(ingredientBudget[name] >= low_price){ 
                mq[name] = { 
                    name: options[2].name, 
                    price: options[2].price, 
                    quality: "low"
                }
            }else{ 
                mq[name] = { 
                    name: "ingredient", 
                    price: 0, 
                    quality: "no"
                }
            }
 
        })
        setMatchingQuality(mq)
    }
    return (
        <>
            <NavBar></NavBar>
            <div className="find-highest-quality-question">
                <p>Find out the highest-quality version of a meal for a given budget</p>
                <input type="radio" name="choice" onChange={() => {setUserChoice(true)}}></input>Yes
                <input type="radio" name="choice" onChange={() => setUserChoice(false)}></input>No
            </div>
            
            {singleMealDetail ? (
                <>
                    {userChoice ? (
                        <div className="meal-budget-container">
                            <div className="meal-budget-section">
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Ingredients</td>
                                            <td>Price </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {singleMealDetail.ingredients.map((ingredient, index:number) => (
                                            <tr key={index}>
                                                <td>{ingredient.name}</td>
                                                <td><input
                                                type="number"
                                                step="0.1"
                                                value={ingredientBudget[ingredient.name] ?? "Nan"}
                                                onChange = {(e) => {
                                                    setIngredientBudget(
                                                        {...ingredientBudget,
                                                        [ingredient.name]: parseFloat(e.target.value)
                                                        } 
                                                        
                                                    )
                                            
                                                }
                                                    
                                                    
                                                }
                                            
                                                ></input></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    
                                </table>
                                {allFieldsFilled && (
                                    <button onClick={handleQualityCalculation}>Get highest quality version</button>
                                )}
                            </div>
                            
                            {Object.keys(matchingQuality).length > 0 && (
                                <>
                                <ul className="quality">
                                    {Object.entries(matchingQuality).map(([name,  quality]) => (
                                        <li className="quality-result" key={name}>
                                            For {name} and a budget of ${ingredientBudget[name]} you can get {quality.quality} quality {quality.name}
                                        </li>
                                    ))}
                                </ul>
                                <div className="go-home-container">
                                 
                                    <>
                                    <p>Thank you for choosing us. </p>
                                    <Link to = "/">Go Home :)</Link>
                                    </>
                                     
                                
                                </div>
                             </>
                            )}
                        </div>
                    ) : 
                    
                        (
                            <div className="meal-detail-container" >
                                <div className="meal-header-section">
                                    <h2>{singleMealDetail.name}</h2>
                                    <h3>Quality Score: {qualityTotal.toFixed(0)} </h3>
                                    <h3>Price: ${totalPrice.toFixed(2)}</h3>
                                </div>
                                <div className="card-ingredients">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Ingredients: </th>
                                                <th>High Quality</th>
                                                <th>Medium Quality</th>
                                                <th>Low Quality</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {singleMealDetail.ingredients.map((ingredient, index:number) => (
                                                <tr key={index}>
                                                <td> {ingredient.name}</td>
                                                {ingredient.options.map((ingredient_options, optionIndex) => (
                                                    <td key={optionIndex}>
                                                        <input type="radio" 
                                                        name={`${ingredient}${index}`} 
                                                        value={ingredient_options.price}
                                                        onChange={() => { 
                                                            handleOptionChange(ingredient.name, optionIndex)
                                                        }}
                                                        ></input>{
                                                            optionIndex === 0 ? `$ ${(ingredient.quantity/1000 * ingredient_options.price).toFixed(2)}` :
                                                            optionIndex === 1 ? `$ ${(ingredient.quantity/1000 * ingredient_options.price ).toFixed(2)}` :
                                                            optionIndex === 2 ? `$ ${(ingredient.quantity/1000 * ingredient_options.price ).toFixed(2)}` : ""
                                                        }
                                                    </td>
                                                    
                                                ))}
                        
                                            </tr>
                                            ))}
                                            
                                        </tbody>
                                    </table>
                                </div>    
                                <div className="go-home-container">
                                    {qualityTotal > 0 && (
                                        <>
                                        <p>Thank you for choosing us. </p>
                                        <Link to = "/">Go Home :)</Link>
                                        </>
                                        
                                    )}
                                </div>            
                            </div>
                        )
                    
                    
                    }
                    
                </>
            ): <div><p>Loading...</p></div>    // <p>Details could are loading :)</p>
            }

           
        </>
    )
    
}
export default Menu_Detail