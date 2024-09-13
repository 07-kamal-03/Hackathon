import './Explorechallenges.css'
import searchIcon from '../../assets/carbon_search.svg'
import upArrow from '../../assets/Caret-up.svg'
import downArrow from '../../assets/Caret-down.svg'
import { useState, useEffect } from 'react'
import deleteIcon from '../../assets/gridicons_cross-circle.svg';
import { Hackathoncard } from '../Hackathoncards/Hackathoncard';

export const Explorechallenges = () => {
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const statusOptions = ["All", "Active", "Upcoming", "Past"];
    const levelOptions = ["Easy", "Medium", "Hard"];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleStatusChange = (option) => {
        if (selectedStatus.includes(option)) {
            setSelectedStatus(selectedStatus.filter((item) => item !== option));
        } else {
            setSelectedStatus([...selectedStatus, option]);
        }
    };

    const handleLevelChange = (option) => {
        if (selectedLevel.includes(option)) {
            setSelectedLevel(selectedLevel.filter((item) => item !== option));
        } else {
            setSelectedLevel([...selectedLevel, option]);
        }
    };

    const removeFilter = (filter, type) => {
        if (type === 'status') {
            setSelectedStatus(selectedStatus.filter((item) => item !== filter));
        } else if (type === 'level') {
            setSelectedLevel(selectedLevel.filter((item) => item !== filter));
        }
    };
    function handleKeyDown() {

    }
    return (<>
        <div className='explore-container'>
            <p className='explore-title'>Explore Challenges</p>
            <div className='input-container'>
                <div className='search-container'>
                    <input type='text' placeholder='Search' onChange={(e) => (setSearchText(e.target.value))} onKeyDown={handleKeyDown} />
                    <div className='search-icon'>
                        <img src={searchIcon} alt='search' onClick={() => apiSearch()} />
                    </div>
                </div>
                <div className={`filter-container ${isOpen ? "open" : "close"}`}>
                    <button onClick={toggleDropdown} className={`dropdown-toggle ${isOpen ? "open" : "close"}`}>
                        <span>Filter</span> <img src={isOpen ? upArrow : downArrow} alt='arrow' />
                    </button>
                    {isOpen && (
                        <div className="dropdown-menu">
                            <hr />
                            <div className="filter-section">
                                <h4>Status</h4>
                                {statusOptions.map((option) => (
                                    <label key={option} className="dropdown-item">
                                        <input
                                            type="checkbox"
                                            checked={selectedStatus.includes(option)}
                                            onChange={() => handleStatusChange(option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            <hr />
                            <div className="filter-section">
                                <h4>Level</h4>
                                {levelOptions.map((option) => (
                                    <label key={option} className="dropdown-item">
                                        <input
                                            type="checkbox"
                                            checked={selectedLevel.includes(option)}
                                            onChange={() => handleLevelChange(option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='filter-data'>
                {selectedStatus.map((value, index) => (
                    <div className="filter-items" key={index}><span>{value} <img src={deleteIcon} alt='delete' onClick={() => removeFilter(value, 'status')} /></span></div>
                ))}
                {selectedLevel.map((value, index) => (
                    <div className='filter-items' key={index}><span>{value} <img src={deleteIcon} alt='delete' onClick={() => removeFilter(value, 'level')} /></span></div>
                ))}
            </div>
        </div>
        <div className="allhackathans-container">
            <Hackathoncard searchText={searchText} selectedStatus={selectedStatus} selectedLevel={selectedLevel} />
        </div>
        <div className={`filter-overlay ${isOpen ? "open" : "close"}`}></div>
    </>
    )
}
