/* eslint-disable no-param-reassign */
import * as React from 'react';
import { InputNumber, Radio } from 'antd';

import Matrix from '../Matrix/Matrix';

require('./matrixInput.scss');

interface MatrixInputProps {
    order: number;
    onChangeOrder: any;
    onChangeMode: any;
    bindWith: any;
    mode: string;
}

const MatrixInput: React.FC<MatrixInputProps> = ({
    order,
    onChangeOrder,
    bindWith,
    mode,
    onChangeMode
}) => {
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
    };

    return (
        <div className="container-inputmatrix">
            <div className="order-martrix">
                <InputNumber
                    min={2}
                    max={7}
                    defaultValue={order}
                    onChange={onChangeOrder}
                    inputMode="numeric"
                    placeholder="Ordre matrice"
                    style={{ height: 30, alignSelf: 'flex-end', marginRight: -60 }}
                />
                <span>Ordre matrice</span>

                <Radio.Group value={mode} onChange={onChangeMode}>
                    <Radio value="min" style={radioStyle}>
                        Min
                    </Radio>
                    <Radio value="max" style={radioStyle}>
                        Max
                    </Radio>
                </Radio.Group>
            </div>

            <Matrix data={bindWith()} />
        </div>
    );
};

export default MatrixInput;
