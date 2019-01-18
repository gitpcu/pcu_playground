import React, { Component } from 'react';
import './Timer.scss';

interface TimerProps {
    startTime: number;
    deadLine: number;
    timeOverListener: Function;
}
interface TimerState {
    leftTime: number;
}
class Timer extends Component<TimerProps, TimerState> {
    state: TimerState = {
        leftTime: 0
    }
    timer: any;
    startTime: number = this.props.startTime;
    deadLine: number = this.props.deadLine;

    shouldComponentUpdate(nextProps: TimerProps, nextState: TimerState) {
        if(nextProps.startTime == -1) {
            return false;
        }
        if(nextState.leftTime > this.deadLine) {
            clearInterval(this.timer);
            alert("저런.. 시간초과네요");
            nextProps.timeOverListener();
            
            return false;
        }
        return true;
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                leftTime: Math.round((Date.now() - this.startTime)/1000)
            });
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const convertTime = this.props.deadLine - this.state.leftTime;

        return(
            <div className="Nemox2_timer">
                남은시간: {Math.floor(convertTime/60)}분 {Math.floor(convertTime%60)}초
            </div>
        )
    }
}

export default Timer;