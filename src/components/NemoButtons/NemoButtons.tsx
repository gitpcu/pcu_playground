import React from 'react';
import './NemoButtons.scss';
import { MdRefresh, MdDone } from 'react-icons/md'



const NemoButtons = (prop: {submitDataListener: Function}) => {
    const submitCallback = (e: any) => {
        prop.submitDataListener.bind(this);
        
        const blocks = document.getElementsByClassName('NemoBlock');
        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
                blocks[16*i+j]
            }
        }
    }
    return (
        <div className="NemoButtons">
            <div className="NemoButtons_refresh">
                <MdRefresh size={"2rem"} fill={"white"} />
            </div>
            <div onClick={prop.submitDataListener.bind(this)} className="NemoButtons_submit">
                <MdDone size={"2rem"} fill={"white"} />
            </div>
        </div>
    )
}

export default NemoButtons;