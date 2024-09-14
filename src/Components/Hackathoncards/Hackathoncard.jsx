import './Hackathoncard.css'
import circleTick from '../../assets/charm_circle-tick.svg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Hackathoncard = ({ selectedStatus = [], selectedLevel = [], searchText }) => {
    const [sortOrder, setSortOrder] = useState('old-to-new');
    const [filteredCards, setFilteredCards] = useState([]);
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getCards() {
        try {
            setLoading(true);
            const response = await fetch("https://hackathon-t6pd.onrender.com/CARDS");   
            console.log(response);
                 
            const data = await response.json();
            console.log(data);
            
            setCards(data);
            setFilteredCards(data);
        } catch (error) {
            console.error("Failed to fetch cards", error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
         getCards();
         console.log("useEffect() called");
    }, []);

    const Countdown = ({ startDate, endDate }) => {
        const calculateTimeRemaining = (targetDate) => {
            const now = new Date();
            const target = new Date(targetDate);
            const difference = target - now;
            if (difference <= 0) return { days: 0, hours: 0, minutes: 0 };
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            return { days, hours, minutes };
        };
        const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endDate));
        useEffect(() => {
            const interval = setInterval(() => {
                setTimeRemaining(calculateTimeRemaining(endDate));
            }, 60000);
            return () => clearInterval(interval);
        }, [endDate]);

        const formatTime = (time) => `${String(time.days).padStart(2, '0')} : ${String(time.hours).padStart(2, '0')} : ${String(time.minutes).padStart(2, '0')}`;

        return (
            <div>
                <p className='timer'>{formatTime(timeRemaining)}</p>
                <div className='timer-title'>
                    <p>Days</p>
                    <p>Hours</p>
                    <p>Mins</p>
                </div>
            </div>
        );
    };

    const formatPastDate = (date) => {
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const d = new Date(date);
        const day = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear().toString().slice(-2);
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        return `${day}${daySuffix(day)} ${month}'${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
    };
    const cards1 = [{ id: 1, title: 'Sample Card', startDate: '2024-09-01', endDate: '2024-09-30' }];
    const getStatus = (startDate, endDate) => {
        const currentDate = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (currentDate >= start && currentDate <= end) {
            return {
                status: "Active",
                cardStatus: "Ends in"
            };
        } else if (currentDate < start) {
            return {
                status: "Upcoming",
                cardStatus: "Starts in"
            };
        } else {
            return {
                status: "Past",
                cardStatus: "Ended on"
            };
        }
    };

    useEffect(() => {
        let filtered = cards.filter((card) => {
            const { status } = getStatus(card.startDate, card.endDate);
            const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(status);
            const matchesLevel = selectedLevel.length === 0 || selectedLevel.includes(card.level);

            return matchesStatus && matchesLevel;
        });

        filtered.sort((a, b) => {
            const dateA = new Date(sortOrder === 'old-to-new' ? a.startDate : a.endDate);
            const dateB = new Date(sortOrder === 'old-to-new' ? b.startDate : b.endDate);
            return sortOrder === 'old-to-new' ? dateA - dateB : dateB - dateA;
        });

        const searchFiltered = filtered.filter((value) => {
            const normalizedSearchText = searchText.toLowerCase();
            return normalizedSearchText === '' ? true : value.title.toLowerCase().includes(normalizedSearchText);
        });

        setFilteredCards(searchFiltered);
    }, [searchText, selectedStatus, selectedLevel, sortOrder]);

    return (
        <><div className="sort-dropdown">
            <label htmlFor="options">Sort : </label>
            <select id="options" name="options" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="old-to-new" >Oldest to Newest</option>
                <option value="new-to-old" >Newest to Oldest</option>
            </select>
        </div>
            <div className='card-container'>
            {loading && <div className='loading alert'>
                <div className='box'></div>Loading...</div>}
                {filteredCards.filter((value) => {
                    const normalizedSearchText = searchText?.toLowerCase() || '';
                    return normalizedSearchText === '' ? value : value.title.toLowerCase().includes(searchText);
                }).map((value, index) => {
                    const { status, cardStatus } = getStatus(value.startDate, value.endDate);
                    return (
                        <div className='card-wrapper' key={index}>
                            <img src={`https://hackathon-t6pd.onrender.com/cardimage/${value.image}`} alt='Hackathon' />
                            <div className='card-content'>
                                <div className={`status ${status == "Active" ? 'active' : status == "Upcoming" ? 'upcoming' : 'past'}`}>{status}</div>
                                <p className='card-title'>{value.title}</p>
                                <p className='card-status'>{cardStatus}</p>
                                <div className='card-time'>{status === 'Active' || status === 'Upcoming' ? (
                                    <Countdown startDate={value.startDate} endDate={value.endDate} />
                                ) : (
                                    <p className='past-date'>{formatPastDate(value.endDate)}</p>
                                )}</div>
                                <button className='card-button' onClick={() => navigate(`/card/${value.id}`)}><img src={circleTick} alt='circleTick' /> <span>Participate Now</span></button>
                            </div>
                        </div>)
                })}
            </div>
        </>
    )
}
