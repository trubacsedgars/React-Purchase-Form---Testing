import './Form.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Select from '../Select/Select';
import Button from '../Button/Button';

const Form = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    cardNumber: '',
    cardMonth: '',
    cardCVC: '',
    Name: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const changeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      email: e.target.value,
    });
  };

  const changeCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      cardNumber: e.target.value,
    });
  };

  const changeCardMonthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      cardMonth: e.target.value,
    });
  };

  const changeCardCVCInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      cardCVC: e.target.value,
    });
  };

  const changeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      Name: e.target.value,
    });
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.email && inputValue.cardNumber && inputValue.cardMonth && inputValue.cardCVC && inputValue.Name) {
      setIsFormValid(true);
    }
    setSubmitted(true);
  };

  return (
    <form
      className="form"
      onSubmit={onFormSubmit}
    >
      {submitted && isFormValid ? (
        <div className="form__success-message">
          Success! Thank you for your purchase!
        </div>
      ) : ''}
      <div className="form__title">
        Buy Teddy Bear
      </div>
      <label className="form__label">
        <span>Email</span>
        <input
          disabled={submitted && isFormValid}
          type="text"
          className="form__input"
          placeholder="Email"
          value={inputValue.email}
          onChange={changeEmailInput}
        />
        {submitted && !inputValue.email
          ? (
            <span className="form__error-msg">
              Please enter your email!
            </span>
          ) : ''}
      </label>
      <label className="form__label">
        <span>Card information</span>
        <div className="form__card-info">
          <input
            disabled={submitted && isFormValid}
            type="tel"
            inputMode="numeric"
            pattern="[0-9\s]{13,19}"
            autoComplete="cc-number"
            maxLength={19}
            className="form__input"
            placeholder="0000 0000 0000 0000"
            value={inputValue.cardNumber}
            onChange={changeCardNumberInput}
          />
          <button className="form__input-card-button">
            <FontAwesomeIcon
              className="form__input-card-icon"
              icon={faCreditCard}
            />
          </button>
        </div>
        {submitted && !inputValue.cardNumber
          ? (
            <span className="form__error-msg">
              Please enter your card number
            </span>
          ) : ''}
        <div className="form__input-card">
          <input
            disabled={submitted && isFormValid}
            type="text"
            maxLength={5}
            className="form__input-card-info"
            placeholder="MM/YY"
            value={inputValue.cardMonth}
            onChange={changeCardMonthInput}
          />
          <input
            disabled={submitted && isFormValid}
            type="tel"
            inputMode="numeric"
            pattern="[0-9\s]{3}"
            maxLength={3}
            className="form__input-card-info"
            placeholder="CVC"
            value={inputValue.cardCVC}
            onChange={changeCardCVCInput}
          />
          {submitted && !inputValue.cardMonth
            ? (
              <span className="form__error-msg">
                Please enter your card
                <br />
                expiration!
              </span>
            ) : ''}
          {submitted && !inputValue.cardCVC
            ? (
              <span className="form__error-msg">
                Please enter your card
                <br />
                CVC!
              </span>
            ) : ''}
        </div>
      </label>
      <label className="form__label">
        <span>Name on card</span>
        <input
          disabled={submitted && isFormValid}
          type="text"
          className="form__input"
          placeholder="Name"
          value={inputValue.Name}
          onChange={changeNameInput}
        />
        {submitted && !inputValue.Name
          ? (
            <span className="form__error-msg">
              Please enter your name!
            </span>
          ) : ''}
      </label>
      <Select
        disabled={submitted && isFormValid}
      />
      <Button
        type="submit"
        name="Pay &nbsp; &euro; 55.00"
        onClick={() => (isFormValid ? submitted : console.log('User got errors'))}
      />
    </form>
  );
};

export default Form;
