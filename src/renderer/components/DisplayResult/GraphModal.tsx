/* eslint-disable no-param-reassign */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable spaced-comment */
import * as React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Dialog, Slide } from '@material-ui/core';
import Matrix from '../Matrix/Matrix';
import RangeView from '../Matrix/RangeView';
import RangeEdit from '../Matrix/RangeEdit';
import Graph from './Graph';

const Transition = React.forwardRef(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

require('./graphModal.scss');

interface GraphModalProps {
    visible: boolean;
    onCancel: any;
    matrix: any;
    graph: any;
}

const GraphModal: React.FC<GraphModalProps> = ({ visible, onCancel, matrix, graph }) => {
    const matrixFormated = () => {
        return matrix.map((r: any) => {
            r = r.map((c: any) => {
                c = c.value;
                return c;
            });
            return r;
        });
    };

    const bindWith = (formatedMatrix: any) => {
        return formatedMatrix.map((r: any) => {
            r = r.map((c: any) => {
                c = {
                    value: c,
                    DataViewer: RangeView,
                    DataEditor: (props: any) => <RangeEdit {...props} disabled={true} />
                };
                return c;
            });
            return r;
        });
    };

    return (
        //@ts-ignore
        <Dialog fullScreen open={visible} onClose={onCancel} TransitionComponent={Transition}>
            <Button
                shape="circle"
                icon={<CloseOutlined />}
                style={{ position: 'absolute', top: 10, right: 10 }}
                onClick={onCancel}
            />

            <div className="graph-container">
                <div style={{ flex: 1 }}>
                    <Matrix data={bindWith(matrixFormated())} />
                </div>
                <div style={{ flex: 1 }}>
                    <Graph />
                </div>
            </div>
        </Dialog>
    );
};

export default GraphModal;
