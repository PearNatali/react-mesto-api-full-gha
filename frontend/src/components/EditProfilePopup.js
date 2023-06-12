import PopupWithForm from "./PopupWithForm";
import {useEffect, useState, useContext} from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if (currentUser.name !== undefined && currentUser.about !== undefined) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    const handleNameChange = (evt) => {
        setName(evt.target.value)  
    }
    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onUpdateUser({
            name, 
            about: description
        })
    }

    return (
        <PopupWithForm
            name={'profile'}
            title={'Редактировать профиль'}
            isOpen={props.isOpen}
            onButtonClose={props.onButtonClose}
            onOverlayClose={props.onOverlayClose}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}>
                    <input 
                        className="popup__input popup__input_type_name" 
                        name="name" 
                        type="text" 
                        placeholder="Ваше имя"
                        id ="name-profile" 
                        minLength={2} 
                        maxLength={40}
                        required
                        value={name}
                        onChange={handleNameChange}/>
                    <span id="name-profile-error" className="error"></span>
                    <input 
                        className="popup__input popup__input_type_job" 
                        name="job" 
                        type="text" 
                        placeholder="Ваша профессия"
                        id ="job-profile" 
                        minLength={2} 
                        maxLength={30}
                        required
                        value={description}
                        onChange={handleDescriptionChange}/>
                    <span id="job-profile-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup