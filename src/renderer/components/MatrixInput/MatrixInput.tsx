/* eslint-disable no-param-reassign */
import * as React from 'react';
import { InputNumber } from 'antd';

import Matrix from '../Matrix/Matrix';

require('./matrixInput.scss');

interface MatrixInputProps {
    order: number;
    onChangeOrder: any;
    bindWith: any;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ order, onChangeOrder, bindWith }) => {
    return (
        <div className="container-inputmatrix">
            <div className="order-martrix">
                <InputNumber
                    min={2}
                    max={8}
                    defaultValue={order}
                    onChange={onChangeOrder}
                    inputMode="numeric"
                    placeholder="Ordre matrice"
                />
                <span>Ordre matrice</span>
            </div>

            <Matrix data={bindWith()} />
        </div>
    );
};

export default MatrixInput;
