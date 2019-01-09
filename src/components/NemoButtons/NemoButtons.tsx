import React from 'react';
import './NemoButtons.scss';
import { MdRefresh, MdDone } from 'react-icons/md'



const NemoButtons = (prop: {refreshDataListener: Function, submitDataListener: Function}) => {
    const { refreshDataListener, submitDataListener } = prop;
    
    return (
        <div className="NemoButtons">
            <div onClick={refreshDataListener.bind(this)} className="NemoButtons_refresh">
                <MdRefresh size={"2rem"} fill={"white"} />
            </div>
            <div onClick={submitDataListener.bind(this)} className="NemoButtons_submit">
                <MdDone size={"2rem"} fill={"white"} />
            </div>
        </div>
    )
}

export default NemoButtons;