import {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleLinkChange = (evt) => {
        setLink(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onAddPlace({name, link})
    }

    return (
        <PopupWithForm
            name={'place'}
            title={'Новое место'}
            isOpen={props.isOpen}
            onButtonClose={props.onButtonClose}
            onOverlayClose={props.onOverlayClose}
            buttonText={'Создать'}
            onSubmit={handleSubmit}>
                    <input className="popup__input popup__input_type_title " 
                        name="name" 
                        id ="name-item"
                        type="text" 
                        placeholder="Название"
                        minLength={2} 
                        maxLength={200}
                        value={name}
                        required
                        onChange={handleNameChange}/>
                    <span id ="name-item-error" className="error"></span>
                    <input 
                        className="popup__input popup__input_type_link" 
                        type="url"
                        id="link" 
                        name="link"
                        value={link}
                        placeholder="Ссылка на картинку"
                        required
                        onChange={handleLinkChange}/>
                    <span id="link-error" className="error"></span>
        </PopupWithForm>
    )
 }

 export default AddPlacePopup