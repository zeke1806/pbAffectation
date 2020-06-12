/* eslint-disable no-param-reassign */
/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Dialog, Slide } from '@material-ui/core';
import Matrix from '../Matrix/Matrix';
import RangeView from '../Matrix/RangeView';
import RangeEdit from '../Matrix/RangeEdit';

const Transition = React.forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

require('./graph.scss');

interface GraphProps {
    visible: boolean;
    onCancel: any;
    matrix: any;
}

const Graph: React.FC<GraphProps> = ({ visible, onCancel, matrix }) => {
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
                <div style={{ flex: 1 }}>graph</div>
            </div>
        </Dialog>
    );
};

export default Graph;
