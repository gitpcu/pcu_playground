import React, { MouseEvent, Component } from 'react';
import './NemoBlock.scss';

interface NemoBlockProps {
    checkBoard: Function;
    i: number;
    j: number;
    reset: boolean;
    burn?: number;
}
interface NemoBlockState {
    type: string,
}
class NemoBlock extends Component<NemoBlockProps, NemoBlockState> {
    state: NemoBlockState = {
        type: ''
    }

    componentWillReceiveProps(nextProps: NemoBlockProps) {
        if(this.props.reset != nextProps.reset) {
            this.setState({
                type: ''
            })
        }

        if(typeof nextProps.burn == 'number') {
            Promise.resolve((() => {
                this.setState({
                    type: nextProps.burn == 1 ? 'blocked' : ''
                })
            })()).then(() => nextProps.checkBoard(nextProps.i, nextProps.j, true));
        }
    }
    blockChangeListener = (e: any) => {
        e.preventDefault();
        if(typeof document.onclick == "function") {
            return;
        }
        
        let { type } = this.state;
        const { checkBoard, i, j } = this.props;

        if(e.button == 0) {
            if(type == 'empty') {
                return;
            } else if(type == '') {
                type = 'blocked';
            } else {
                type = '';
            }

            Promise.resolve((() => {
                this.setState({
                    type
                })
            })()).then(() => checkBoard(i, j));

        } else if(e.button == 2) {
            if(type == 'blocked') {
                return;
            } else if(type == '') {
                type = 'empty';
            } else {
                type = '';
            }
            
            this.setState({
                type
            })
        }

    }
    render() {
        const {blockChangeListener} = this;
        return(
            <div
              onDragEnter={blockChangeListener} 
              onContextMenu={(e) => {e.preventDefault();}} 
              onMouseUp={blockChangeListener} 
              className={`NemoBlock ${this.state.type}`} 
              draggable
            />
        )
    }
}

export default NemoBlock;