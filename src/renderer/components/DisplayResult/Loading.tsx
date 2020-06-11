import * as React from 'react';

const classnames = require('classnames');
require('./rotate.scss');

const processImg = require('../../assets/process.png');

interface LoadingProps {
    onLoad: boolean;
}

const Loading: React.FC<LoadingProps> = ({ onLoad }) => {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <img
                src={processImg}
                alt="process"
                style={{ width: 250, height: 250 }}
                className={classnames({
                    rotating: onLoad
                })}
            />
        </div>
    );
};

export default Loading;
