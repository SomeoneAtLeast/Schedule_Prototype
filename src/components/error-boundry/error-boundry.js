/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import ErrorMessage from '../error-message';

export default class ErrorBoundry extends Component {

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}