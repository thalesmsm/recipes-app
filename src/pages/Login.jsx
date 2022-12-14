import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';
import '../css/Login.css';

export default function Login() {
  const [email, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const history = useHistory();

  function handleChangeEmail({ target }) {
    const { value } = target;

    setUserEmail(value);
  }

  function handleChangePassword({ target }) {
    const { value } = target;

    setUserPassword(value);
  }

  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  const validEmail = () => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regex.test(email);
  };

  function validLogin() {
    const minimumPassword = 6;
    const emailValid = validEmail();
    const passwordValid = userPassword.length > minimumPassword;

    return emailValid && passwordValid;
  }

  function handleClickLoginButton() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  }

  return (
    <div className="form-container">
      <form>
        {/* <h1>Cook n&apos; Drink</h1> */}
        <img src={ logo } alt="logo" className="cook" />
        <div className="inputs-container">
          <input
            data-testid="email-input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="input-login"
            onChange={ handleChangeEmail }
          />
          <input
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            className="input-login"
            onChange={ handleChangePassword }
          />
        </div>
        <button
          type="submit"
          name="submitButton"
          data-testid="login-submit-btn"
          disabled={ !validLogin() }
          onClick={ handleClickLoginButton }
          className={
            `${
              !validLogin()
                ? 'disabled'
                : 'btn-login'} `
          }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
