import { Link } from 'react-router-dom';
import * as auth from '../utils/auth';

const Login = ({ handleLogin, handleLoginFail }) => {
    const handleSubmit = (email, password) => {
        if (!email || !password) {
            return
        }
        auth.authorize(email, password)
            .then((data) => {
                if (data && data.token) {
                    handleLogin();
                } else {
                    alert("Неверный логин или пароль")
                }
            })
            .catch(err => {
                handleLoginFail();
                console.log(err);
            });
    }

    return (
        <Login
            onSubmit={handleSubmit}
            title={'Вход'}
            buttonText={'Войти'}>
            <div className="auth__option">
                <p className="auth__option-text">Еще не зарегистрированы?&nbsp;</p>
                <Link to="/sign-up" className="auth__option-link">Зарегестрироваться</Link>
            </div>
        </Login>
    )
}


export default Login