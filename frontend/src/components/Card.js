import Delete from '../images/delete.svg';
import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const card = props.card;
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const handleCardClick = () => {props.onCardClick(card)};

    const handleLikeClick = () => {
        props.onLikeClick(card);
    }

    const handleDeleteClick = () => {
        props.onDeleteClick(card);
    }

    return (
        <li className="card-template" id = "card-template">
            <article className="card__item">
                <div className="card__img">
                    <img className="card__photo" src={card.link} name="name" alt={card.name} onClick={handleCardClick}/>
                </div>
                {isOwn &&
                    <div className="card__button">
                        <img 
                            className="card__button_delete" 
                            src = {Delete} 
                            onClick={handleDeleteClick}
                            alt = "Кнопка удаления карточки" 
                            type="button" 
                            aria-label="удалить"/>
                    </div>
                }
                <div className="card__text">
                    <h2 className="card__title">{card.name}</h2>
                    <div className="card__info-like">
                        <button 
                            className={`card__button_like ${isLiked && 'card__button_like-active'}`}
                            type="button" 
                            onClick={handleLikeClick}
                            aria-label="оценить">
                        </button>
                        <h3 className="card__number-like">{card.likes.length}</h3>
                    </div>
                </div>
            </article>
        </li>
    );
}

export default Card
