import React, { Component, Suspense, lazy } from 'react';
import './Nemox2.scss';
import { logics } from '../static/logics';
import { deepCopyArray } from '../lib/Utils';

const NemoBoard = lazy(() => import('../components/NemoBoard/NemoBoard'));
const Timer = lazy(() => import('../components/Timer/Timer'));

interface Nemox2State {
    stageNum: number;
    stage: { 
        name: string, 
        length: number,
        blockCount: number,
        logic: number[][],
        //logics: string
    };
    disable: boolean;
}

class Nemox2 extends Component<any, Nemox2State> {
    state: Nemox2State = {
        stageNum: 0,
        stage: logics[0],
        disable: null
    }

    callNextStage: () => void = () => {
        const next = this.state.stageNum + 1;
        
        if(next < logics.length) {
            alert("맞추셨네요. 다음 스테이지로 넘어갑니다-");
            this.setState({
                stageNum: next,
                stage: logics[next]
            });
        } else {
            alert("축하합니다! 스테이지를 모두 클리어하셨습니다.");
            this.setState({
                disable: true
            })
        }
    }
    timeOverListener: () => void = () => {
        this.setState({
            disable: true
        })
    }
    render() {
        const { stageNum, stage, disable } = this.state;
        const { callNextStage, timeOverListener } = this;
        // const num = logics[2].logics.split(",")[1].split("0").join(" ").trim().split(" ");
        // const num2 = logics[1].logics.split("");
        // let hintI: any = [];
        // let hintJ: any = [];

        // for(let i=0; i<25; i++) {
        //     if(num2[i] == "1") {
        //         hintJ[25%i]
        //     }
        // }

        //console.log(num2)
        return(
            <div className="Nemox2_template">
                <div className="Nemox2_section">
                    <Suspense fallback={<p>Now loading...</p>} >
                        <Timer startTime={!this.state.disable ? Date.now() : -1} deadLine={stage.logic.length * 60} timeOverListener={timeOverListener} key={stage.name} />
                        <h3 className="Nemox2_title">{`스테이지 ${stageNum+1} : ${stage.name}`}</h3>
                        <NemoBoard disable={disable} stage={stage} callNextStage={callNextStage} />
                    </Suspense>
                </div>
            </div>
        )
    }
}

export default Nemox2;