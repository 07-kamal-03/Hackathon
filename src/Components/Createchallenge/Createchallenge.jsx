import './Createchallenge.css';
import { useNavigate } from 'react-router-dom';
import uploadIcon from '../../assets/icons/bxs_cloud-upload.svg';
import { useState } from 'react';

export const Createchallenge = ({ onCreate }) => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await fetch('https://appsail-50022244014.development.catalystappsail.in/CARDS', {
                method: 'POST',
                body: formData
            })
            const data = await response.json();
            if (response.ok) {
                navigate('/')
            }
        }
        catch {
            alert('Unable to connect to server!')
        }
    }

    return (
        <div className='createchallenge-container'>
            <div className='form-title'><p>Challenge Details</p></div>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div><label htmlFor='challenge-name'>Challenge Name</label>
                        <input type='text' id='challenge-name' name='title' /></div>
                    <div>
                        <label htmlFor='start-date'>Start Date</label>
                        <input type='date' id='start-date' name='startDate' />
                    </div>
                    <div>
                        <label htmlFor='end-date'>End Date</label>
                        <input type='date' id='end-date' name='endDate' />
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <input type='textarea' id='description' name='description' />
                    </div>
                    <div>
                        {selectedImage &&
                            <div className="image-preview">
                                <img src={selectedImage} alt="Selected Preview" />
                            </div>}
                        <label >Image</label>
                        <label htmlFor='image' className='custom-file-input'>{!selectedImage ? 'Upload image' : 'Re-upload image'}<img src={uploadIcon} alt='uploadIcon' /></label>
                        <input type='file' id='image' name='image' onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='level-type'>Level Type</label>
                        <select id="level-type" name="level">
                            <option value="easy" >Easy</option>
                            <option value="medium" >Medium</option>
                            <option value="hard" >Hard</option>
                        </select>
                    </div>

                    <button type='submit' className='submit-button'>Create Challenge</button>
                </form>
            </div>
        </div>
    )
}
