/* eslint-disable no-param-reassign */
import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import AppHeader from './AppHeader/AppHeader';
import Info from './AppHeader/Info';
import MatrixInput from './MatrixInput/MatrixInput';
import RangeEdit from './Matrix/RangeEdit';
import DisplayResult from './DisplayResult/DisplayResult';
import Graph from './DisplayResult/Graph';

const Application = () => {
    const [state, setState] = React.useState<any>({
        order: 2,
        matrix: [[]],
        mode: 'min',
        displayGraph: false
    });

    React.useEffect(() => {
        setState({ ...state, matrix: generateMatrixValue() });
    }, [state.order]);

    React.useEffect(() => {
        require('antd/dist/antd.css');
    }, []);

    const generateMatrixValue = () => {
        const base: object[][] = [];
        for (let i = 0; i < state.order; i += 1) {
            base.push([]);
            for (let i2 = 0; i2 < state.order; i2 += 1) {
                base[i].push({
                    value: 0
                });
            }
        }
        return base;
    };

    const handleChangeMatrix = (x: number, y: number) => (value: any) => {
        setState({
            ...state,
            matrix: state.matrix.map((r: any, i: number) => {
                r = r.map((c: any, i2: number) => {
                    if (x === i && y === i2) {
                        return { ...c, value: parseInt(value, 10) };
                    }
                    return { ...c };
                });
                return r;
            })
        });
    };

    const handleChangeMode = (e: any) => {
        setState({ ...state, mode: e.target.value });
    };

    const bindWith = () => {
        return state.matrix.map((r: any, i: number) => {
            r.forEach((c: any, i2: number) => {
                c.DataEditor = (props: any) => (
                    <RangeEdit {...props} onChangeMatrix={handleChangeMatrix(i, i2)} />
                );
            });
            return r;
        });
    };

    const reset = () => {
        setState({ ...state, matrix: generateMatrixValue() });
    };

    const handleDisplayGraph = (value: boolean) => () => {
        setState({ ...state, displayGraph: value });
    };

    return (
        <div>
            <Info />
            <AppHeader />
            <MatrixInput
                order={state.order}
                onChangeOrder={(value: any) => setState({ ...state, order: value })}
                bindWith={bindWith}
                onChangeMode={handleChangeMode}
                mode={state.mode}
            />
            <DisplayResult
                matrix={state.matrix}
                reset={reset}
                mode={state.mode}
                displayGraph={handleDisplayGraph(true)}
            />
            <Graph
                visible={state.displayGraph}
                onCancel={handleDisplayGraph(false)}
                matrix={state.matrix}
            />
        </div>
    );
};

export default hot(Application);
