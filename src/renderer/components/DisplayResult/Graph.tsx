/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Dialog, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

interface GraphProps {
    visible: boolean;
    onCancel: any;
}

const Graph: React.FC<GraphProps> = ({ visible, onCancel }) => {
    return (
        //@ts-ignore
        <Dialog fullScreen open={visible} onClose={onCancel} TransitionComponent={Transition}>
            <Button
                shape="circle"
                icon={<CloseOutlined />}
                style={{ position: 'absolute', top: 10, right: 10 }}
                onClick={onCancel}
            />
        </Dialog>
    );
};

export default Graph;
