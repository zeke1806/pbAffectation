/* eslint-disable func-names */
import * as React from 'react';
import { PythonShell } from 'python-shell';
import Header from './Header';
import Loading from './Loading';

require('./displayResult.scss');

interface DisplayResultProps {
    matrix: any;
    reset: any;
}

const DisplayResult: React.FC<DisplayResultProps> = ({ matrix, reset }) => {
    const [state, setState] = React.useState({
        onLoad: false
    });

    const resolve = () => {
        PythonShell.run(
            '/home/zeke/Projets/M1/pbAffectation/pbAffectation/src/python/main.py',
            {
                mode: 'text'
            },
            function(err: any, results: any) {
                if (err) throw err;
                alert(results[0]);
            }
        );
        // setState({ ...state, onLoad: true });
        // setTimeout(function() {
        //     setState({ ...state, onLoad: false });
        // }, 1500);
    };

    return (
        <div className="card-container">
            <Header resolve={resolve} reset={reset} />
            <div className="scrollable-content-view">
                <Loading onLoad={state.onLoad} />
            </div>
        </div>
    );
};

export default DisplayResult;
