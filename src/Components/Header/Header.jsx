import logo from '../../assets/main_logo_with_darktext_dphi 1.svg'
import './Header.css'

export const Header = () => {
    return (
        <div className='header-wrapper'>
            <div className='header-logo'>
                <img src={logo} alt='DPhi' />
            </div>
        </div>
    )
}
