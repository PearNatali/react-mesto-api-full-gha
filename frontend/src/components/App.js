import {useEffect, useState} from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/Api";

import { CurrentUserContext } from '../contexts/CurrentUserContext'
import {CardsContext} from '../contexts/CardsContext'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupPictureOpen, setIsPopupPictureOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = useState({ });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (isRegisterSuccess) => {
    setIsInfoTooltipOpen(true);
    setIsTooltipSuccess(isRegisterSuccess);
  }
  const handleLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setHeaders(token);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
          .then(([userData, cards]) => {
              setCurrentUser(userData);
              setCards(cards);
              setLoggedIn(true);
              navigate("/main", {replace: true});
          })
          .catch(err => console.log(err))
  }
  }
  const handleLoginFail = () => {
    setIsInfoTooltipOpen(true);
    setIsTooltipSuccess(false);
  }

  const handleSignOut = () => {
    setLoggedIn(false);
    setCurrentUser({});
    setCards([]);
    localStorage.removeItem('token');
  }

  useEffect(() => {
    handleLogin();
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPopupPictureOpen(true);
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupPictureOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({name: '' , link: ''})
  }
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isPopupPictureOpen

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', handleEscClose);
      return () => {document.removeEventListener('keydown', handleEscClose)}
    }
  }, [isOpen]);

  const closePopupByOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(isLiked, card._id) 
      .then(newCard => {
        setCards(state => state.map((a) => a._id === card._id ? newCard : a))
      })
      .catch(err => console.log(err));
  }
  
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
        .then(() => {
            setCards(state => state.filter((c) => c._id !== card._id));
        })
        .catch(err => console.log(err));
  }

  const handleUpdateUser = (userData) => {
    api.updateUserInfo(userData)
        .then(res => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(err => console.log(err))
  }

  const handleAddCard = (cardData) => {
    api.addCard(cardData)
        .then(res => {
            setCards([res, ...cards]);
            closeAllPopups();
        })
        .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (link) => {
    api.changeAvatar(link)
        .then(res => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(err => console.log(err))
  }

  return (
    <CardsContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
          <Header onSignOut={handleSignOut} />
          <Routes>
            <Route path='/sign-up' element={<Register handleRegister={handleRegister}/>} />
            <Route path='/sign-in' element={<Login handleLoginFail={handleLoginFail} handleLogin={handleLogin}/>} />
            <Route 
              path='/' element={loggedIn ? <Navigate to='/main' replace/> : <Navigate to='/sign-in' replace/>}/>
            <Route 
              path='/main'
              element={
                <ProtectedRoute
                  element={Main}
                  cards={cards}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleEditPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onLikeClick={handleCardLike}
                  onDeleteClick={handleCardDelete}/>
              }/>
          </Routes>
          <Footer/>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onButtonClose={closeAllPopups}
            onOverlayClose={closePopupByOverlayClick}
            onUpdateUser={handleUpdateUser}/>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onButtonClose={closeAllPopups}
            onOverlayClose={closePopupByOverlayClick}
            onUpdateAvatar={handleUpdateAvatar}/>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onButtonClose={closeAllPopups}
            onOverlayClose={closePopupByOverlayClick}
            onAddPlace={handleAddCard}/>
          <ImagePopup
            card={selectedCard}
            isOpen={isPopupPictureOpen}
            onButtonClose={closeAllPopups}
            onOverlayClose={closePopupByOverlayClick}/>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onButtonClose={closeAllPopups}
            onOverlayClose={closePopupByOverlayClick}
            isTooltipSuccess={isTooltipSuccess}/>
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CardsContext.Provider>
    
  )
}

export default App;
