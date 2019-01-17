import React from 'react'
import './NemoItem.scss';
import { FaArrowsAltH, FaArrowsAltV,  } from 'react-icons/fa';
import { GoFlame } from "react-icons/go";

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
    
    const icon = () => {
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
            {icon()}
            {/* {type == 'checkHorizontal' && <FaArrowsAltH size={size} color={color} />}
            {type == 'checkVertical' && <FaArrowsAltV size={size} color={color} />}
            {type == 'burnHorizontal' && <GoFlame size={size} color={color} />}
            {type == 'burnHorizontal' && <span>가로</span>}
            {type == 'burnVertical' && <GoFlame size={size} color={color} />}
            {type == 'burnVertical' && <span>세로</span>} */}
        </div>
    )
}

export default NemoItem;