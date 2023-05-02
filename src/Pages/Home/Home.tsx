import { useNavigate} from 'react-router-dom'
import NavBar from '../../Components/NavBar/NavBar'
import "./Home.css"
import heroImage from "../../assets/Hero Image.webp"
const Home = () => {
  let navigate = useNavigate()
  return (
    <>
    <NavBar></NavBar>
    <div className='home-container'>
      <div className='hero-section-container'>
        <div className='hero-section-text-container'>
          <h2>Discover meals that fit your budget</h2>
          <p>Find the perfect meal within your budget with our meal finder tool. Get lucky and discover a delicious meal that'll satisfy your cravings. Plus, be aware that choosing a low or medium quality meal will result in an additional cost of $0.10 or $0.50 respectively. Try it now!</p>
          <button onClick={() => {navigate("/menu")}}>Explore Menu</button>
        </div>
        
        <div className='hero-image-container'>
          <div className='frame-bottom'></div>
          <div className='frame-top'></div>
          <img src = {heroImage}></img>
        </div>
      </div>
    </div>
    </>
    
  );
};
export default Home;
