import React from 'react';
import Context from "../context"

const WithService = () => (Wrapped) => {
    return (props) => {
        return (
            <Context.Consumer>
                {
                    (Service) => {
                        return <Wrapped {...props} Service={Service}/>
                    }
                }
            </Context.Consumer>
        )
    }
}

export default WithService;
