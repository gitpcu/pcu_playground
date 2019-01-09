import React, { Component } from 'react';
import NemoBlock from '../NemoBlock/NemoBlock';
import './NemoBoard.scss';
import NemoButtons from '../NemoButtons/NemoButtons';

const convertLogic = (logic: number[][]) => {
    let indexI = [];
    let indexJ = [];

    for(let i=0; i<logic.length; i++) {
        indexI[i] = "0";
        indexJ[i] = "0";
    }

    for(let i=0; i<logic.length; i++) {
        for(let j=0; j<logic[i].length; j++) {
            const check = logic[i][j];
            const lastCharI = indexI[i][indexI[i].length-1];
            const lastCharJ = indexJ[j][indexJ[j].length-1];

            if(check == 1) {
                if(lastCharI == "0") {
                    indexI[i] = "1";
                } else if(lastCharI == " ") {
                    indexI[i] += "1";
                } else {
                    const newValue: any = Number.parseInt(lastCharI)+1;
                    indexI[i] = indexI[i].slice(0, indexI[i].length-1) + newValue;
                }
                if(lastCharJ == "0") {
                    indexJ[j] = "1";
                } else if(lastCharJ == " ") {
                    indexJ[j] += "1";
                } else {
                    const newValue: any = Number.parseInt(lastCharJ)+1;
                    indexJ[j] = indexJ[j].slice(0, indexJ[j].length-1) + newValue;
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
        }
    }
    console.log({indexI, indexJ});
    return {indexI, indexJ};
}

const makeBoard = (logic: number[][]) => {
    const size = logic.length;
    let board: any[] = [];
    
    for(let i=0; i<size; i++) {
        board[i] = [];
    }
    for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++) {
            board[i][j] = <NemoBlock key={`${i},${j}`} />
        }
    }

    return board;
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

interface NemoBoardProps {
    logicData: any[][]
}
interface NemoBoardState {
    board: any[][]
}

class NemoBoard extends Component<NemoBoardProps, NemoBoardState> {
    state: NemoBoardState = {
        board: null
    }
    constructor(props: NemoBoardProps) {
        super(props);
    }
    
    componentDidMount() {
        this.setState({
            board: makeBoard(this.props.logicData)
        })
    }

    submitDataListener = () => {
        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
                const userBlock = document.getElementsByClassName('NemoBlock')[16*i+j];
                const answerBlock = this.props.logicData[i][j];

                if(answerBlock == 1) {
                    if(!userBlock.classList.contains('blocked')) {
                        alert("틀려버렸네요~~");
                        return;
                    }
                } else {
                    if(userBlock.classList.contains('blocked')) {
                        alert("틀려버렸네요~~");
                        return;
                    }
                }
            }
        }

        alert("맞추셨네요! 축하드립니다.");
    }
    refreshDataListener = () => {
        const blocked = document.getElementsByClassName('blocked');
        const empty = document.getElementsByClassName('empty');

        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
                document.getElementsByClassName('NemoBlock')[16*i+j].classList.remove('blocked');
                document.getElementsByClassName('NemoBlock')[16*i+j].classList.remove('empty');
            }
        }
    }
    render() {
        const { logicData } = this.props;
        const { indexI, indexJ } = convertLogic(logicData);
        const { refreshDataListener, submitDataListener } = this;
        let board = makeBoard(logicData);

        return(
            <div className="NemoBoard">
                <div className="NemoBoard_wrapper">
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
                    <div className="NemoBoard_board">
                        {this.state.board}
                    </div>
                </div>
                <NemoButtons refreshDataListener={refreshDataListener} submitDataListener={submitDataListener} />
            </div>
        )
    }
    
}



export default NemoBoard;

