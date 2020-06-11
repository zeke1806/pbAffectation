/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from 'react';

import NumericInput from './NumInput';

interface RangeEdit {
    getValue: any;
    cell: any;
    onChange: any;
    onChangeMatrix: any;
    disabled: boolean;
}

const RangeEdit: React.FC<RangeEdit> = ({ getValue, cell, onChange, onChangeMatrix, disabled }) => {
    const defaultValue = getValue({ data: cell }) || 0;
    return disabled ? (
        <div>{getValue({ data: cell })}</div>
    ) : (
        <NumericInput
            // @ts-ignore
            style={{ width: 120 }}
            value={defaultValue}
            onChange={(value: any) => {
                onChange({ ...cell, value });
                onChangeMatrix(value);
            }}
        />
    );
};

export default RangeEdit;
