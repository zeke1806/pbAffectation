import * as React from 'react';
import { Modal } from 'antd';

interface GraphProps {
    visible: boolean;
    onOk: any;
    onCancel: any;
}

const Graph: React.FC<GraphProps> = ({ visible, onOk, onCancel }) => {
    return (
        <Modal title="Basic Modal" visible={visible} onOk={onOk} onCancel={onCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

export default Graph;
