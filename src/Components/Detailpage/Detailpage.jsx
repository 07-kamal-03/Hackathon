import './Detailpage.css'
import { useParams, useLocation } from 'react-router-dom';
import timeIcon from '../../assets/time.svg';
import levelIcon from '../../assets/icons/carbon_skill-level-basic.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Detailpage = () => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function getCards() {
            try {
                const response = await fetch("https://appsail-50022244014.development.catalystappsail.in/CARDS");
                const data = await response.json();
                setCards(data);
                console.log(data);

            } catch (error) {
                console.error("Failed to fetch cards", error);
            }
        }
        getCards();
    }, [])

    const card = cards.find((card) => card.id === parseInt(id));
    if (!card) {
        return <p>Card not found!</p>;
    }
    const formatEventDate = (startDateString, endDateString) => {
        const now = new Date();
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        let status;
        if (now < startDate) {
            status = {
                label: "Starts on",
                date: startDate
            };
        } else if (now >= startDate && now <= endDate) {
            status = {
                label: "Ends on",
                date: endDate
            };
        } else {
            status = {
                label: "Ended on",
                date: endDate
            };
        }

        const options = {
            day: 'numeric',
            month: 'short',
            year: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const formattedDate = status.date.toLocaleString('en-GB', options).replace(/,/g, '');

        return `${status.label} ${formattedDate} (India Standard Time)`;
    };

    async function pageDelete(card) {
        try {
            const response = await fetch(`https://appsail-50022244014.development.catalystappsail.in/CARDS/${card.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                navigate('/')
            }
        } catch (error) {
            alert("Failed to delete card", error);
        }
    }
    return (
        <div className='detailpage-container'>
            <div className='detailpage-header'>
                <p className='detailpage-date'><img src={timeIcon} alt='timeIcon' />{formatEventDate(card.startDate, card.endDate)}</p>
                <p className='detailpage-title'>{card.title}</p>
                <p className='detailpage-description'>{card.description}</p>
                <p className='detailpage-level'><img src={levelIcon} alt='level' /> {card.level}</p>
            </div>
            <div className='detailpage-body'>
                <div className='detailpage-breadcrumbs'>
                    <div className='overview'>
                        <p>Overview</p>
                        <div className='border'></div>
                    </div>
                    <div className='detailpage-buttons'>
                        <button className='edit' onClick={() => navigate(`/card/${card.id}/edit`)}>Edit</button>
                        <button className='delete' onClick={() => pageDelete(card)}>Delete</button>
                    </div>
                </div>
                <div className='detailpage-content'>Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word "Lepidoptera" means "scaly wings" in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows.<br /><br />

                    An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model.<br /><br />

                    Your Task is to build an Image Classification Model using CNN that classifies to which class of weather  each image belongs to.</div>
            </div>
        </div>
    )
}
