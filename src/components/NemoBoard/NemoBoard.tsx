import React, { Component } from 'react';
import NemoBlock from '../NemoBlock/NemoBlock';
import './NemoBoard.scss';
import NemoButtons from '../NemoButtons/NemoButtons';
import DoubleLinkedList from '../../lib/DoubleLinkedList';
import $ from 'jquery';

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
            console.log('프롭리시버');
            $('.blocked').css('backgroundColor', '');
            $('.NemoBlock').removeClass('blocked').removeClass('empty');
            $('.NemoBoard_board').css('width', `${nextProps.logic.length*2}rem`);
        }
    }
    componentDidMount() {
        $('.NemoBoard_board').css('width', `${this.props.logic.length*2}rem`);
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
        const waitAnim = (element: JQuery<HTMLElement>) => {
            return new Promise((resolve, reject) => {
                element.css('backgroundColor', "#a9e34b");
                setTimeout(() => {
                    if(blockedCount < $('.blocked').length) {
                        resolve(waitAnim($('.blocked').eq(++blockedCount)));
                    } else {
                        resolve(true);
                    }
                }, 40);
            })
        }
        
        waitAnim($('.blocked').eq(0)).then(() => this.props.callBackClear());
    }
    refreshDataListener = () => {
        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
                $('.NemoBlock').removeClass('blocked');
                $('.NemoBlock').removeClass('empty');
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

