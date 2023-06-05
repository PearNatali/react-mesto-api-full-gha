function ImagePopup(props) {
    const card = props.card;
    return (
        <div className={`popup popup_zoom ${props.isOpen && 'popup_opened'}`} onMouseDown={props.onOverlayClose}>
            <div className="popup__container popup__container_zoom">
                <button 
                    className="popup__close popup__close_zoom" 
                    onClick={props.onButtonClose}
                    type="button"
                    aria-label="закрыть"></button>
                <img className="popup__img popup__img_zoom" 
                    src={card.link}
                    alt={card.name}/>
                <h2 className="popup__title popup__title_zoom">{card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup