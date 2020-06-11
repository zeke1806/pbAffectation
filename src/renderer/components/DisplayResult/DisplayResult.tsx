/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import * as React from 'react';
import { PythonShell } from 'python-shell';
import Header from './Header';
import Loading from './Loading';
import Result from './Result';

require('./displayResult.scss');

interface DisplayResultProps {
    matrix: any;
    reset: any;
    mode: string;
}

const DisplayResult: React.FC<DisplayResultProps> = ({ matrix, reset, mode }) => {
    const [state, setState] = React.useState({
        onLoad: false,
        result: []
    });

    const matrixFormated = () => {
        return matrix.map((r: any) => {
            r = r.map((c: any) => {
                c = c.value;
                return c;
            });
            return r;
        });
    };

    const resetAll = () => {
        reset();
        setState({ ...state, result: [] });
    };

    const resolve = () => {
        setState({ ...state, onLoad: true });
        const data = matrixFormated();
        PythonShell.run(
            '/home/zeke/Projets/M1/pbAffectation/pbAffectation/src/python/main.py',
            {
                mode: 'text',
                args: [JSON.stringify(data), mode]
            },
            function(err: any, results: any) {
                if (err) throw err;
                const result = JSON.parse(results[0]);
                setTimeout(function() {
                    setState({ ...state, onLoad: false, result });
                }, 1500);
            }
        );
    };

    return (
        <div className="card-container">
            <Header resolve={resolve} reset={resetAll} onLoad={state.onLoad} />
            <div className="scrollable-content-view">
                {state.result.length === 0 ? (
                    <Loading onLoad={state.onLoad} />
                ) : (
                    <Result result={state.result} />
                )}
            </div>
        </div>
    );
};

export default DisplayResult;
