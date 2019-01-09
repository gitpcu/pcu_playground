import React, { Component } from 'react';
import './Nemox2.scss';
import NemoBoard from '../components/NemoBoard/NemoBoard';
import NemoButtons from '../components/NemoButtons/NemoButtons';
import { logic01 } from '../static/logic01';

interface Nemox2Rule {
    submitData: any[];
}

class Nemox2 extends Component {
    state: Nemox2Rule = {
        submitData: null
    }

    submitDataListener(e: any) {
        e.preventDefault();

        console.log("핸들링");
        this.setState({
            submitData: this
        })
    }

    render() {
        const { submitData } = this.state;
        const { submitDataListener } = this;

        return(
            <div className="Nemox2_template">
                <div className="Nemox2_section">
                    <NemoBoard logicData={logic01} />
                    {/* <NemoButtons submitDataListener={submitDataListener} /> */}
                </div>
            </div>
        )
    }
}

export default Nemox2;