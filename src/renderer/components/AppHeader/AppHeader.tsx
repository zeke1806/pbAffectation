/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';

require('./appHeader.scss');

const matrixImg = require('../../assets/Projets.png');

const AppHeader: React.FunctionComponent = () => {
    React.useEffect(() => {
        require('../../libs/rotating-text/index.scss');
        require('../../libs/rotating-text/index');
    }, []);

    return (
        <div className="app-header-container">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center'
                }}
            >
                <img src={matrixImg} alt="Red cube" className="matrix-icon" />
                <div className="text">
                    <p className="static-text">AFF APP</p>
                    <p>
                        <span className="word wisteria">algo_hongrois</span>
                        <span className="word belize">affectation_optimale</span>
                        {/* <span className="word pomegranate">resolution_probleme</span>
                        <span className="word green">beautiful.</span>
                        <span className="word midnight">cheap.</span> */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppHeader;
