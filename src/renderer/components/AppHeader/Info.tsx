import * as React from 'react';
import { Button } from 'antd';

import InfoModal from './InfoModal';

require('./info.scss');

const questionImage = require('../../assets/questions.png');

const Info: React.FC = () => {
    const [state, setState] = React.useState({
        visible: false
    });

    function openModal() {
        setState({ ...state, visible: true });
    }

    function closeModal() {
        setState({ ...state, visible: false });
    }

    return (
        <div className="container">
            <Button type="text" shape="circle" className="questionButton" onClick={openModal}>
                <img src={questionImage} alt="question" className="question-img" />
            </Button>
            <InfoModal visible={state.visible} closeModal={closeModal} />
        </div>
    );
};

export default Info;
