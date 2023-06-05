import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }
    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
    }
    const handleSubmit = (email, password) => {
        if (!email || !password) {
            return
        }
    }

    return (
        <Register
        onSubmit={handleSubmit}
        title={'Регистрация'}
        buttonText={'Зарегестрироваться'}>
            <div className="auth">
                <form 
                    action="#" 
                    name='form'
                    className="auth__form" 
                    onSubmit={handleSubmit}>
                        <h3 className="auth__title">{props.title}</h3>
                        <div className="auth__container">
                        <input 
                            type="email" 
                            className="auth__input" 
                            name="email" 
                            value={email}
                            placeholder="Email" 
                            required 
                            onChange={handleEmailChange}/>
                        </div>
                        <div className="auth__container">
                            <input 
                                type="password" 
                                className="auth__input" 
                                name="password"
                                value={password} 
                                placeholder="Пароль" 
                                required 
                                minLength="8" 
                                onChange={handlePasswordChange}/>
                        </div>
                        <button 
                            className="auth__button" 
                            type="submit">{props.buttonText}
                        </button>
                        {props.children}
                </form>
                <div className="auth__option">
                    <p className="auth__option-text">Уже зарегистрированы?&nbsp;</p>
                    <Link to="/sign-up" className="auth__option-link">Войти</Link>
                </div>
            </div>
        </Register>
    )

}
 export default Register