import React, { Component } from 'react';

export default class Messages extends Component {
    scrollDown= () => {
        const { container } = this.refs;
        container.scrollTop = container.scrollHeight
    };

    componentDidMount() {
        this.scrollDown()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props && this.props !== prevProps) {
            this.scrollDown()
        }
    }

    render() {
        const { messages, user } = this.props;
        return (
            <div ref='container'
                 className="thread-container">
                <div className="thread">
                    {
                        messages.map((mes)=>{
                            return (
                                <div key={mes.id} className={`message-container ${mes.sender === user.name && 'right'}`} >
                                    <img src={mes.avatar} className="avatar" alt={ `avatar of the user ${mes.sender}`}/>

                                    <div className="data">
                                        <div className="name">{mes.sender === user.name? 'Me': mes.sender}</div>
                                        <div className="message">{mes.message}</div>
                                        <div className="time">{mes.time}</div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>


            </div>
        );
    }
}
