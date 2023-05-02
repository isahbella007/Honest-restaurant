import "./Card.css";
import displayImage from "../../assets/Hero Image.webp";
import { useNavigate } from "react-router-dom";
const Card = (props: CardProps) => {
  let navigate = useNavigate()
   
  return (
    <div className="card-container">
      <div className="card" key={props.id} onClick={() => {navigate(`/menu-detail/${props.id}`)}}>
        <div className="card-image-container">
          <img src={displayImage} />
        </div>
        <div className="card-text">
          <div className="menu-price">
            <p className="meal-name">{props.name}</p>
            <p className='meal-price'>${props.lowestVersionPrice.toFixed(2)} - ${props.highestVersionPrice.toFixed(2)}</p>
          </div>
          <div className="menu-description">
            {props.ingredients.map((data: any) => (
              <p key={data.name}>
                {data.quantity}
                {data.quantity_type.slice(0, 1)} of {data.name}{" "}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
