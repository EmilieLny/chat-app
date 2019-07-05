import React, { Component } from 'react';
import { VERIFY_USER } from '../const'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            error: ""
        };
    }

    setUser = ({ user, isUserExisting }) => {
        if (isUserExisting) {
            this.setError("User name already taken, sorry..")
        } else {
            this.props.setUser(user);
            this.setError("");
        }
    };

    setError = (error) => {
        this.setState({ error })
    };


    handleSubmit = (e) => {
        e.preventDefault(); // prevents page reloading
        const { socket } = this.props;
        const { username } = this.state;
        socket.emit( VERIFY_USER, username, this.setUser)
    };

    handleChange = (e) => {
        this.setState({ username: e.target.value })
    };

    render() {
        const { username, error } = this.state;
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form" >

                    <label htmlFor="nickname">
                        <h2>Enter your username</h2>
                    </label>

                    <input
                        ref={(input)=>{ this.textInput = input }}
                        type="text"
                        id= "nickname"
                        value={username}
                        onChange={this.handleChange}
                        placeholder={'Your username'}
                    />
                    <div className="error">{ !!error && error }</div>

                </form>
            </div>
        );
    }
}
