import React, { MouseEvent } from 'react';
import './NemoBlock.scss';

const blockClickListener = (e: any) => {
    e.preventDefault();
    console.log(e.button);

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
const blockDragListener = (e: any) => {
    e.preventDefault();
    console.log(e.button);
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
        <div onDragEnter={blockDragListener} onContextMenu={(e) => {e.preventDefault();}} onMouseUp={blockClickListener} className="NemoBlock" draggable>
            
        </div>
    )
}

export default NemoBlock;