import React from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED } from '../const';
import Login from './Login';
import ChatContainer from './chat/chatContainer'


const SOCKET_URL ="localhost:5000";

export default class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            socket: null,
            user: null,
        };
    };

    componentWillMount() {
       this.connectSocket();
    }

    // Connect to and initializes the socket
    connectSocket = () => {
        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            this.setState({ socket })
        });
    };

    // Set user to the open session
    setUser = (user) => {
        const { socket } = this.state;

        socket.emit(USER_CONNECTED, user);

        this.setState({ user });
    };

    render() {
        const { socket, user } = this.state;
        console.log(socket)
        return (
            <div className="container">
                {
                    user
                    ? <ChatContainer socket={ socket } user={ user } />
                    : <Login socket={ socket } setUser={ this.setUser } />
                }
            </div>
        );
    };
};
