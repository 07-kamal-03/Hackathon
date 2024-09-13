import heroImage from '../../assets/icons/PicsArt_04-14-04.42 1.svg';
import './Hero.css';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className='hero-container'>
            <div className='hero-content'>
                <p className='hero-title'>Accelerate Innovation with Global AI Challenges</p>
                <p className='hero-description'>AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.</p>
                <button className='create-challenge-button' onClick={()=>navigate('/create-challenge')}>Create Challenge</button>
            </div>
            <div className='hero-image'>
                <img src={heroImage} alt='AI Challenges hero image' />
            </div>
        </div>
    )
}
