/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from 'react';

import NumericInput from './NumInput';

interface RangeEdit {
    getValue: any;
    cell: any;
    onChange: any;
    onChangeMatrix: any;
}

const RangeEdit: React.FC<RangeEdit> = ({ getValue, cell, onChange, onChangeMatrix }) => {
    const defaultValue = getValue({ data: cell }) || 0;
    return (
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
