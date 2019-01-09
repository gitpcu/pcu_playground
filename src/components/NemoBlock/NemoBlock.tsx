import React, { MouseEvent } from 'react';
import './NemoBlock.scss';

const blockClickListener = (e: any) => {
    e.preventDefault();
    
    if(e.button == 0) {
        if(e.target.classList.contains('empty')) {
            return;
        }
        e.target.classList.toggle('blocked');
        
    } else if(e.button == 2) {
        if(e.target.classList.contains('blocked')) {
            return;
        }
        e.target.classList.toggle('empty');
    }
}



const NemoBlock = () => {
    return(
        <div onContextMenu={(e) => {e.preventDefault();}} onMouseDown={blockClickListener} className="NemoBlock">
            
        </div>
    )
}

export default NemoBlock;