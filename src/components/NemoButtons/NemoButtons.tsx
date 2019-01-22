import React from 'react';
import './NemoButtons.scss';
import { MdRefresh, MdDone } from 'react-icons/md'


interface NemoButtonsProps {
    refreshBoard: Function;
    stageClearEffect: Function;
}

const NemoButtons = (props: NemoButtonsProps) => {
    const { refreshBoard, stageClearEffect } = props;
    
    return (
        <div className="NemoButtons">
            <div onClick={refreshBoard.bind(this)} className="NemoButtons_refresh">
                <MdRefresh size={"2rem"} fill={"white"} />
            </div>
            <div onClick={stageClearEffect.bind(this)} className="NemoButtons_submit">
                <MdDone size={"2rem"} fill={"white"} />
            </div>
        </div>
    )
}

export default NemoButtons;