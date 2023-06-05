function PopupWithForm(props) {
    const button = props.buttonText || 'Сохранить'
    return (
        <section  
            id="popup-profile" 
            className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`} 
            onMouseDown={props.onOverlayClose}>
            <form 
                onSubmit={props.onSubmit}
                className={`popup__container popup__container_${props.name}`}>
                <button 
                    className={`popup__close popup__close_${props.name}`} 
                    type="button" 
                    onClick={props.onButtonClose}
                    id="popup-close-profile"
                    aria-label="закрыть"></button>
                <div 
                    id="profile-form" 
                    className={`popup__content popup__content_${props.name}`} 
                    name={props.name}>
                    <h2 className="popup__text">{props.title}</h2>
                    {props.children}
                    <button
                        className={`popup__submit popup__submit_${props.name}`} 
                        type="submit" 
                        id="profile-submit"
                        aria-label="отправка">{button}</button>
                </div>
            </form>
        </section>
    )
}

export default PopupWithForm