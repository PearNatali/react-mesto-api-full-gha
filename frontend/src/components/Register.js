import { useState } from 'react';
import { Link } from 'react-router-dom';


const Register = ({handleRegister}) =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }
    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleRegister(email, password)
    }

    return (
        <div className="auth">
            <form 
                action="#" 
                className="auth__form" 
                onSubmit={handleSubmit}>
            <h3 className="auth__title">Регистрация</h3>
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
                    type="submit">Зарегестрироваться
                </button>
            <div className="auth__option">
                <p className="auth__option-title">Уже зарегистрированы?&nbsp;</p>
                <Link to="/sign-in" className="auth__option-link">Войти</Link>
            </div>
            </form>
        </div>
    )

}
 export default Register