import React from 'react';

const noop = () => {}

const Context = React.createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    role: null
}); 

export default Context;