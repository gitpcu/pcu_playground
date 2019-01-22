import React from 'react'
import './NemoItem.scss';
import { FaArrowsAltH, FaArrowsAltV,  } from 'react-icons/fa';
import { GoFlame } from "react-icons/go";

interface NemoItemProps {
    type: string;
    itemAction: Function;
}

const NemoItem = (prop: NemoItemProps) => {
    const { type, itemAction } = prop;
    const size = "1.1rem";
    const color = "white";

    const itemClick = (e: any) => {
        e.target.focus();
        document.body.style.cursor = "pointer";
        
        document.onclick = (e: any) => {  // *아이템 on상태 클릭*
            if(e.target.classList.contains('NemoBlock')) {
                itemAction(type, e.target);
            } else if(e.target.classList.contains('NemoItem_clickSpace')) {
                e.target.click();
                return;
            }

            document.onclick = null;
            document.body.style.cursor = null;
        }
    }
    
    const getIcon = () => {
        switch(prop.type) {
            case 'checkHorizontal':
                return(
                    <FaArrowsAltH size={size} color={color} />
                )
            case 'checkVertical':
                return(
                    <FaArrowsAltV size={size} color={color} />
                )
            case 'burnHorizontal':
                return(
                    <>
                    <div>가로</div>
                    <GoFlame size={size} color={color} />
                    </>
                )
            case 'burnVertical':
                return(
                    <>
                    <div>세로</div>
                    <GoFlame size={size} color={color} />
                    </>
                )
        }
    }
    
    return(
        <div className="NemoItem" onClick={itemClick} tabIndex={-1}>
            <div className="NemoItem_clickSpace" />
            {getIcon()}
        </div>
    )
}

export default NemoItem;