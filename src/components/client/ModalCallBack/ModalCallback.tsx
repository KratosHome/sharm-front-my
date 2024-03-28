"use client";

import React, { useState, ChangeEvent, MouseEvent } from "react";
import "./ModalCallBack.scss";

type ModalCallbackState = {
  isOpen: boolean;
  phoneNumber: string;
  isSending: boolean;
};

interface ModalCallbackProps {
  handleOpenModal: () => void;
}

const ModalCallback: React.FC = () => {
  const [state, setState] = useState<ModalCallbackState>({
    isOpen: false,
    phoneNumber: "",
    isSending: false,
  });

  const handleOpenModal = (): void => {
    setState((prevState) => ({
      ...prevState,
      isOpen: true,
    }));
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      phoneNumber: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      isSending: true,
    }));
    try {
      // Відправка даних на бекенд

      console.log("Дані відправлено на бекенд");
      setState((prevState) => ({
        ...prevState,
        phoneNumber: "",
        isOpen: false,
      }));
    } catch (error) {
      console.error("Помилка під час відправки даних на бекенд:", error);
    }
    setState((prevState) => ({
      ...prevState,
      isSending: false,
    }));
  };

  const handleContinue = (): void => {
    setState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const handleBackdropClick = (): void => {
    setState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Замовити дзвінок 1</button>
      {state.isOpen && (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
          <div className="modal">
            <div className="modal-content">
              <p>Щоденно з 8:00 до 20:00</p>
              <input
                className="phone-number"
                type="text"
                placeholder="+38(___)___-__-__"
                value={state.phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <button
                className="button"
                disabled={
                  !/^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(state.phoneNumber) ||
                  state.isSending
                }
                onClick={handleSubmit}
              >
                Замовити дзвінок
              </button>
              <button className="button mobile-only" onClick={handleContinue}>
                Продовжити покупки
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalCallback;
