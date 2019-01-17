import React, { Component, Suspense, lazy } from 'react';
import './Nemox2.scss';
import { logics } from '../static/logics';
// import NemoBoard from '../components/NemoBoard/NemoBoard';
// import Timer from '../components/Timer/Timer'

const NemoBoard = lazy(() => import('../components/NemoBoard/NemoBoard'));
const Timer = lazy(() => import('../components/Timer/Timer'));

interface Nemox2State {
    stageNum: number;
    stage: { name: string, logic: number[][]};
}

class Nemox2 extends Component<any, Nemox2State> {
    state: Nemox2State = {
        stageNum: 0,
        stage: logics[0],
    }

    callBackClear: () => void = () => {
        const next = this.state.stageNum + 1;
        
        if(next < logics.length) {
            alert("맞추셨네요. 다음 스테이지로 넘어갑니다-");
            this.setState({
                stageNum: next,
                stage: logics[next]
            });
        } else {
            alert("축하합니다! 스테이지를 모두 클리어하셨습니다.");
        }
    }

    render() {
        const { stageNum, stage } = this.state;
        const { callBackClear } = this;

        return(
            <div className="Nemox2_template">
                <div className="Nemox2_section">
                    <Suspense fallback={<p>Now loading...</p>} >
                        <Timer startTime={Date.now()} deadLine={stage.logic.length * 60} key={stage.name} />
                        <h3 className="Nemox2_title">{`스테이지 ${stageNum+1} : ${stage.name}`}</h3>
                            <NemoBoard stage={stage} callBackClear={callBackClear} />
                    </Suspense>
                </div>
            </div>
        )
    }
}

export default Nemox2;