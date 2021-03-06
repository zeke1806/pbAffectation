/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable spaced-comment */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import * as React from 'react';

import GraphModal from './GraphModal';
import Header from './Header';
import Loading from './Loading';
import { PythonShell } from 'python-shell';
import Result from './Result';
import { main } from '../../../algo-hongrois/main';

const path = require('path');
require('./displayResult.scss');

interface DisplayResultProps {
    matrix: any;
    reset: any;
    mode: string;
    displayGraph: any;
    handleDisplayGraph: any;
    graphVisible: boolean;
}

const DisplayResult: React.FC<DisplayResultProps> = ({
    matrix,
    reset,
    mode,
    displayGraph,
    handleDisplayGraph,
    graphVisible
}) => {
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
        // const pythonPath = `${path.resolve(__dirname)}/../../../../../../src/python/main.py`;
        // PythonShell.run(
        //     pythonPath,
        //     {
        //         mode: 'text',
        //         args: [JSON.stringify(data), mode]
        //     },
        //     function(err: any, results: any) {
        //         if (err) throw err;
        //         const result = JSON.parse(results[0]);
        //         setTimeout(function() {
        //             setState({ ...state, onLoad: false, result });
        //         }, 1500);
        //     }
        // );

        const result = main(data, mode);
        setTimeout(function() {
            setState({ ...state, onLoad: false, result });
        }, 1500);
    };

    return (
        <div className="card-container">
            <Header
                resolve={resolve}
                reset={resetAll}
                onLoad={state.onLoad}
                result={state.result}
                displayGraph={displayGraph}
            />
            <div className="scrollable-content-view">
                {state.result.length === 0 ? (
                    <Loading onLoad={state.onLoad} />
                ) : (
                    <Result result={state.result} />
                )}
            </div>
            {state.result.length > 0 && (
                <GraphModal
                    visible={graphVisible}
                    onCancel={handleDisplayGraph(false)}
                    matrix={matrix}
                    //@ts-ignore
                    graph={state.result[state.result.length - 1].graph}
                />
            )}
        </div>
    );
};

export default DisplayResult;
