import './Createchallenge.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import uploadIcon from '../../assets/icons/bxs_cloud-upload.svg';

export const Editchallenge = ({ onCreate }) => {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    const [intialData, setInitialData] = useState([]);
    async function getDatas() {
        const response = await fetch(`https://appsail-50022244014.development.catalystappsail.in/CARDS/${params.id}`)
        const data = await response.json();
        setInitialData(data)
    }
    useEffect(() => getDatas, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await fetch(`https://appsail-50022244014.development.catalystappsail.in/CARDS/${params.id}`, {
                method: 'PATCH',
                body: formData
            })
            const data = await response.json();
            if (response.ok) {
                alert('Success')
                navigate(`/card/${params.id}`)
            }
        }
        catch {
            alert('Unable to connect to server!')
        }
    }
    const imageCheck = useState(intialData.image);
    return (
        <div className='createchallenge-container'>
            <div className='form-title'><p>Challenge Details</p></div>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div><label htmlFor='challenge-name'>Challenge Name</label>
                        <input type='text' id='challenge-name' name='title' defaultValue={intialData.title} /></div>
                    <div>
                        <label htmlFor='start-date'>Start Date</label>
                        <input type='date' id='start-date' name='startDate' defaultValue={intialData.startDate} />
                    </div>
                    <div>
                        <label htmlFor='end-date'>End Date</label>
                        <input type='date' id='end-date' name='endDate' defaultValue={intialData.endDate} />
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <input type='textarea' id='description' name='description' defaultValue={intialData.description} />
                    </div>
                    <div>
                        <div className="image-preview">
                            <img src={`https://appsail-50022244014.development.catalystappsail.in/cardimage/` + intialData.image} alt='Hackathon' />
                        </div>
                        <label >Image</label>
                        <label htmlFor='image' className='custom-file-input'>{!imageCheck ? 'Upload image' : 'Re-upload image'}<img src={uploadIcon} alt='uploadIcon' /></label>
                        <input type='file' id='image' name='image' />
                    </div>
                    <div>
                        <label htmlFor='level-type'>Level Type</label>
                        <select id="level-type" name="level" defaultValue={intialData.level}>
                            <option value="easy" >Easy</option>
                            <option value="medium" >Medium</option>
                            <option value="hard" >Hard</option>
                        </select>
                    </div>

                    <button type='submit' className='submit-button'>Save changes</button>
                </form>
            </div>
        </div>
    )
}
