import {useContext} from 'react';
import Card from './Card.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CardsContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    const cards = useContext(CardsContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div onClick={props.onEditAvatar} 
                        className="profile__avatar-button"
                        aria-label="редактировать">
                        <img className="profile__avatar" 
                            src={currentUser.avatar} 
                            alt="Аватар"/>
                    </div>
                    <div className="profile__editform">
                        <div className="profile__text">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button 
                                className="profile__pen" 
                                onClick={props.onEditProfile} 
                                type="button" 
                                aria-label="редактировать">
                            </button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__button" type="button" aria-label="добавить"></button>
            </section>

            <section className="card">
                <ul className="card__table">
                    {cards.map((card) =>
                        <Card onCardClick={props.onCardClick}
                        onLikeClick={props.onLikeClick} 
                        onDeleteClick={props.onDeleteClick}
                        key={card._id} 
                        card={card}/>
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main