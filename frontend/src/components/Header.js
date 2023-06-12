import logo from '../images/logo.svg';
import {useEffect, useState, useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Header({email, onSignOut}) {
    const [headerInfo, setHeaderInfo] = useState({});
    const currentUser = useContext(CurrentUserContext);
    const location = useLocation();

    const handleLinkClick = () => {
        if (location.pathname === '/main') {
            onSignOut();
        }
    }

    useEffect(() => {
        let headerInfo = {};
        if (location.pathname === '/main') {
            headerInfo = {
                email: currentUser.hasOwnProperty('email') && currentUser.email,
                link: '/signin',
                linkText: 'Выйти'
            }
        } else if (location.pathname === '/signup') {
            headerInfo = {
                email: '',
                link: '/signin',
                linkText: 'Войти'
            }
        } else if (location.pathname === '/signin') {
            headerInfo = {
                email: '',
                link: '/signup',
                linkText: 'Регистрация'
            }
        }
        setHeaderInfo(headerInfo);
    }, [location])

    return (
        <header className="header">
            <div href="/" className="header__link-logo">
                <img 
                    src={logo} 
                    alt="Логотип" 
                    className="header__logo"/>
            </div>
            <div className="header__info">
                <p className="header__email">{headerInfo.email}</p>
                <Link 
                    className="header__link" 
                    to={headerInfo.link} 
                    onClick={handleLinkClick}>{headerInfo.linkText}</Link>
            </div>
        </header>
    )
}

export default Header