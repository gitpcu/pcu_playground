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
    logic: number[][];
    callBackClear: Function;
}

class NemoBoard extends Component<NemoBoardProps> {

    constructor(props: NemoBoardProps) {
        super(props);
    }

    componentWillReceiveProps(nextProps: NemoBoardProps) {
        if(nextProps.logic) {
            this.refreshDataListener();
            const board = document.getElementsByClassName('NemoBoard_board')[0] as HTMLElement;
            board.style.width = `${nextProps.logic.length*2}rem`;
        }
    }
    componentDidMount() {
        const board = document.getElementsByClassName('NemoBoard_board')[0] as HTMLElement;
        board.style.width = `${this.props.logic.length*2}rem`;
    }

    submitDataListener = () => {
        const logic = this.props.logic;
        
        for(let i=0; i<logic.length; i++) {
            for(let j=0; j<logic.length; j++) {
                const userBlock = document.getElementsByClassName('NemoBlock')[logic.length*i+j];
                const answerBlock = logic[i][j];
                
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

        let blockedCount = 0;
        const waitAnim = (element: HTMLElement) => {
            return new Promise((resolve, reject) => {
                const blocked = document.querySelectorAll('.blocked');
                if(blockedCount < blocked.length) {
                    element.style.backgroundColor = "#a9e34b";
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
        const blockArr = document.getElementsByClassName('NemoBlock') as HTMLCollectionOf<HTMLElement>;

        for(let i=0; i<blockArr.length; i++) {
            if(blockArr[i].classList.contains('blocked')) {
                blockArr[i].style.backgroundColor = "";
                blockArr[i].classList.remove('blocked');
            } else if(blockArr[i].classList.contains('empty')) {
                blockArr[i].classList.remove('empty');
            }
            
        }
    }
    render() {
        const { logic } = this.props;
        const { indexI, indexJ } = convertLogic(logic);
        const { refreshDataListener, submitDataListener } = this;
        let board = makeBoard(logic);

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
                        {board}
                    </div>
                </div>
                <NemoButtons refreshDataListener={refreshDataListener} submitDataListener={submitDataListener} />
            </div>
        )
    }
    
}



export default NemoBoard;

