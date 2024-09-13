import './Outcomes.css';
import { OUTCOMES } from '../../constants/contents';

export const Outcomes = () => {
    return (
        <div className='outcomes-container'>
            <div className='outcomes-wrapper'>
                {OUTCOMES.map((value, index) => (
                    <div className='content-wrapper' key={index}>
                        <div className='outcomes-image'>
                            <img src={value.icon} alt={value.title} />
                        </div>
                        <div className='outcomes-content'>
                            <p className='outcomes-title'>{value.title}</p>
                            <p className='outcomes-description'>{value.description}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
