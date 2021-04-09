import React from 'react';
import './error-message.scss';

const ErrorMessage = () => {
    return (
        <div className="error-message">
            <span className="error-message-text">
                Что-то пошло не так.<br/>
                Обратитесь к разработчику.<br/>
            </span>
        </div>
    )
}

export default ErrorMessage;