import './Accordians.css'
import { ACCORDIANS } from '../../constants/contents'

export const Accordians = () => {
    return (
        <div className='accordian-container'>
            {ACCORDIANS.map((value, index) => (
                <div className='accordian-wrapper' key={index}>
                    <div className='accordian-image'>
                        <img src={value.icon} alt={value.title} />
                    </div>
                    <div className='accordian-content'>
                        <p className='accordian-title'>{value.title}</p>
                        <p className='accordian-description'>{value.description}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}
