import React from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../const';
import LoginForm from './Login';
// import ChatContainer from './chats/ChatContainer'


const SOCKET_URL ="localhost:5000";

export default class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            socket: null,
            user: null,
        }
    };

    componentWillMount() {
        this.initSocket();
    }

    // Connect to and initializes the socket.
    initSocket = () => {
        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            console.log('Connected to socket.io !')
        });

        this.setState({ socket })
    };

    // Sets user state
    setUser = (user)=>{
        const { socket } = this.state;

        socket.emit(USER_CONNECTED, user);

        this.setState({ user })
    };

    // Sets user state logout => null
    logout = ()=>{
        const { socket } = this.state;

        socket.emit(LOGOUT);

        this.setState({ user: null })
    };

    render() {
        const { socket, user } = this.state;
        return (
            <div className="container">
                {
                    <LoginForm socket={ socket } setUser={ this.setUser } />
                }
            </div>
        );
    };
};
