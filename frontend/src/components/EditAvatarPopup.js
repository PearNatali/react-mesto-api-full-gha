import {useEffect, useRef} from 'react'
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const linkInputRef = useRef();

    useEffect(() => {linkInputRef.current.value = ''}, [props.isOpen])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onUpdateAvatar(linkInputRef.current.value);
    }
    return (
        <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            isOpen={props.isOpen}
            onButtonClose={props.onButtonClose}
            onOverlayClose={props.onOverlayClose}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}>
                    <input 
                        className="popup__input popup__input_type_link" 
                        type="url"
                        id="avatar" 
                        name="link"
                        placeholder="Ссылка на картинку"
                        required
                        defaultValue=""
                        ref={linkInputRef}/>
                    <span id="avatar-error" className="error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup