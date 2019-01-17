import React, { Component } from 'react';
import NemoBlock from '../NemoBlock/NemoBlock';
import './NemoBoard.scss';
import NemoButtons from '../NemoButtons/NemoButtons';
import update from 'react-addons-update';
import NemoItem from '../NemoItem/NemoItem';

const convertLogic = (logic: number[][]) => {
    let indexI = [];
    let indexJ = [];

    for(let i=0; i<logic.length; i++) {
        indexI[i] = "0";
        indexJ[i] = "0";
    }

    let overI = 0;
    let overJ = 0;
    for(let i=0; i<logic.length; i++) {
        for(let j=0; j<logic[i].length; j++) {
            const check = logic[i][j];
            const lastCharI = indexI[i][indexI[i].length-1];
            const lastCharJ = indexJ[j][indexJ[j].length-1];

            if(check == 1) {
                if(lastCharI == "0") {
                    if(!indexI[i][indexI[i].length-2]) {
                        indexI[i] = "1";
                    } else {
                        indexI[i] = overI+"";
                    }
                } else if(lastCharI == " ") {
                    indexI[i] += "1";
                } else {
                    const newValue: any = Number.parseInt(lastCharI)+1;
                    indexI[i] = indexI[i].slice(0, indexI[i].length-1) + newValue;
                    
                    if(newValue % 10 == 0) {
                        overI = newValue + 1;
                    }
                }
                if(lastCharJ == "0") {
                    if(!indexJ[j][indexJ[j].length-2]) {
                        indexJ[j] = "1";
                    } else {
                        indexJ[j] = overJ + "";
                    }
                } else if(lastCharJ == " ") {
                    indexJ[j] += "1";
                } else {
                    const newValue: any = Number.parseInt(lastCharJ)+1;
                    indexJ[j] = indexJ[j].slice(0, indexJ[j].length-1) + newValue;

                    if(newValue % 10 == 0) {
                        overJ = newValue + 1;
                    }
                }
            } else {
                if(lastCharI == "0" || lastCharI == " ") {
                } else {
                    indexI[i] += " ";
                }
                if(lastCharJ == "0" || lastCharJ == " ") {
                } else {
                    indexJ[j] += " ";
                }
            }

            if(i == logic.length-1 && indexJ[j].lastIndexOf(" ") == indexJ[j].length-1) {
                indexJ[j] = indexJ[j].slice(0, indexJ[j].length-1);
            }
        }
        if(indexI[i].lastIndexOf(" ") == indexI[i].length-1) {
            indexI[i] = indexI[i].slice(0, indexI[i].length-1);
        }
    }
    console.log({indexI, indexJ});
    return {indexI, indexJ};
}


const CountBlock = (prop: {value: string}) => {
    return (
        <div className="CountBlock">
            {
                prop.value.split(" ").map((value, key) => {
                    return <span key={key}>{value}</span>
                })
            }
        </div>
    )
}


const itemActions = (type: string) => {
    
}

const horizontalItemAction = () => {

}

interface NemoBoardProps {
    stage: {name: string, logic: number[][]};
    callBackClear: Function;
}
interface NemoBoardState {
    resetCount: number;
    currentLogic: number[][];
    reset: boolean;
}
class NemoBoard extends Component<NemoBoardProps> {
    state: NemoBoardState = {
        resetCount: 0,
        currentLogic: this.props.stage.logic,
        reset: false
    }
    currentLogic: number[][];
    convertValue: { indexI: string[], indexJ: string[] } = convertLogic(this.props.stage.logic);
    blockCount: number = 0;
    currentCount: number = 0;
    board: any = React.createRef();
    items: any = React.createRef();

    componentWillReceiveProps(nextProps: NemoBoardProps) {
        if(nextProps.stage.logic) {
            this.refreshDataListener();
            this.board.current.style.width = `${nextProps.stage.logic.length*2}rem`;
            this.currentLogic = nextProps.stage.logic;
            this.convertValue = convertLogic(nextProps.stage.logic);
        }
    }
    componentDidMount() {
        this.board.current.style.width = `${this.props.stage.logic.length*2}rem`;
        this.currentLogic = this.props.stage.logic;
        this.currentCount = this.blockCount;
    }

    submitDataListener = () => {
        let blockedCount = 0;
        const blocked = document.querySelectorAll('.blocked');
        const waitAnim = (element: HTMLElement) => {
            return new Promise((resolve, reject) => {
                if(blockedCount < blocked.length) {
                    element.style.backgroundColor = "#40c057";
                    setTimeout(() => {
                        resolve(waitAnim(blocked[++blockedCount] as HTMLElement));
                    }, 40);
                } else {
                    setTimeout(() => {
                        resolve(true);
                    }, 150)
                }
            })
        }
        
        waitAnim(document.querySelectorAll('.blocked')[0] as HTMLElement).then(() => this.props.callBackClear());
    }
    refreshDataListener = () => {
        this.currentLogic = this.props.stage.logic;
        this.blockCount = 0;

        this.setState({
            reset: !this.state.reset
        })
    }
    checkBoard = (i: number, j: number) => {
        this.currentLogic = update(
            this.currentLogic,
            {
                [i]: {[j]: {$set: this.currentLogic[i][j] == 1 
                    ? (() => {
                        this.blockCount--;
                        return 0;
                    })()
                    : (() => {
                        this.blockCount++;
                        return 1;
                    })()}
                }
            }
        )

        if(this.blockCount == 0) {
            this.submitDataListener();
        }
        console.log(this.blockCount);
    }
    itemActions = (type: string, target: HTMLElement): void => {
        const size = this.currentLogic.length;
        const blockList = this.board.current.childNodes;
        const boardLength = this.board.current.childNodes.length;
        let targetIndex;
        for(let i=0; i<boardLength; i++) {
            if(blockList[i] == target) {
                targetIndex = i;
                break;
            }
        }

        switch(type) {
            case "checkHorizontal":
                let leftIndex = targetIndex - 1;
                let rightIndex = targetIndex + 1;
                if(leftIndex % size != 4 && this.currentLogic[Math.floor(leftIndex/size)][leftIndex%size] == 1) {
                    alert("틀렸습니다. 수정하세요 :(");
                    return;
                }
                if(rightIndex % size != 0 && this.currentLogic[Math.floor(rightIndex/size)][rightIndex%size] == 1) {
                    alert("틀렸습니다. 수정하세요 :(");
                    return;
                }
                
                alert("맞습니다. 계속 진행하세요 :>");
                return;
            case "checkVertical":
                let aboveIndex = targetIndex - size;
                let underIndex = targetIndex + size;
                if(aboveIndex > 0 && this.currentLogic[Math.floor(aboveIndex/size)][aboveIndex%size] == 1) {
                    alert("틀렸습니다. 수정하세요 :(");
                    return;
                }
                if(underIndex < boardLength && this.currentLogic[Math.floor(underIndex/size)][underIndex%size] == 1) {
                    alert("틀렸습니다. 수정하세요 :(");
                    return;
                }

                alert("맞습니다. 계속 진행하세요 :>");
                return;
        }
    }
    render() {
        const { logic, name } = this.props.stage;
        const { indexI, indexJ } = this.convertValue;
        const { refreshDataListener, submitDataListener, itemActions } = this;

        return(
            <div className="NemoBoard">
                <div className="NemoBoard_indexJ">
                    {
                        indexJ.map((value, key) => {
                            return <CountBlock value={value} key={key} />;
                        })
                    }
                </div>
                <div className="NemoBoard_indexI">
                    {
                        indexI.map((value, key) => {
                            return <CountBlock value={value} key={key} />;
                        })
                    }
                </div>
                <div className="NemoBoard_wrapper">
                    <div className="NemoBoard_board" ref={this.board} >
                        {logic.map((valueI, i) => {
                            return valueI.map((valueJ, j) => {
                                if(logic[i][j] == 1)
                                    this.blockCount++;
                                
                                return <NemoBlock checkBoard={this.checkBoard} reset={this.state.reset} key={`${name}${i}${j}`} i={i} j={j} />
                            })
                        })}
                    </div>
                    <div className="NemoBoard_items" ref={this.items} >
                        <span>아이템 목록</span>
                        <NemoItem type="checkHorizontal" action={itemActions} />
                        <NemoItem type="checkVertical" action={itemActions} />
                        <NemoItem type="burnHorizontal" action={itemActions} />
                        <NemoItem type="burnVertical" action={itemActions} />
                    </div>
                </div>
                <NemoButtons refreshDataListener={refreshDataListener} submitDataListener={submitDataListener} />
            </div>
        )
    }
    
}

export default NemoBoard;

