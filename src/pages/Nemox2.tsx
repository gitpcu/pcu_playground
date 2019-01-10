import React, { Component } from 'react';
import './Nemox2.scss';
import NemoBoard from '../components/NemoBoard/NemoBoard';
import { logics } from '../static/logics';

interface Nemox2State {
    stageNum: number;
    stage: { name: string, logic: number[][]};
}

class Nemox2 extends Component {
    state: Nemox2State = {
        stageNum: 0,
        stage: logics[0]
    }

    constructor(props: any) {
        super(props);
    }

    callBackClear: () => void = () => {
        const nextNum = this.state.stageNum +1;
        console.log(nextNum);
        if(nextNum < logics.length) {
            alert("맞추셨네요. 다음 스테이지로 넘어갑니다-");
            this.setState({
                stageNum: nextNum,
                stage: logics[nextNum]
            });
        } else {
            alert("축하합니다! 스테이지를 모두 클리어하셨습니다.");
        }
        console.log("클리어바인딩");
        console.log(this.state);
    }

    render() {
        const { stageNum, stage } = this.state;
        const { name, logic } = stage;
        const { callBackClear } = this;

        return(
            <div className="Nemox2_template">
                <div className="Nemox2_section">
                    <h3 className="Nemox2_title">{`스테이지 ${stageNum+1} : ${name}`}</h3>
                    <NemoBoard logic={logic} callBackClear={callBackClear} />
                </div>
            </div>
        )
    }
}

export default Nemox2;