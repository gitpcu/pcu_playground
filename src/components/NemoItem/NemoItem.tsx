import React from 'react'
import './NemoItem.scss';
import { FaArrowsAltH, FaArrowsAltV,  } from 'react-icons/fa';

interface NemoItemProps {
    type: string;
    action: Function;
}

const NemoItem = (prop: NemoItemProps) => {
    const { type, action } = prop;
    const size = "1.1rem";
    const color = "white";

    const itemClick = (e: any) => {
        e.target.focus();
        document.body.style.cursor = "pointer";
        
        document.onclick = (e: any) => {  // *아이템 on상태 클릭*
            e.preventDefault();
            
            if(e.target.classList.contains('NemoBlock')) {
                action(type, e.target);
                
                console.log("성공");
            }
            document.onclick = null;
            document.body.style.cursor = null;
        }
    }
    
    return(
        <div className="NemoItem" onClick={itemClick} tabIndex={-1}>
            {type == 'checkHorizontal' && <FaArrowsAltH size={size} color={color} />}
            {type == 'checkVertical' && <FaArrowsAltV size={size} color={color} />}
        </div>
    )
}

export default NemoItem;