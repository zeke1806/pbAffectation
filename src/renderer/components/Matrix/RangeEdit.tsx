import * as React from 'react';
import { InputNumber } from 'antd';

interface RangeEdit {
    getValue: any;
    cell: any;
    onChange: any;
    onChangeMatrix: any;
}

const RangeEdit: React.FC<RangeEdit> = ({ getValue, cell, onChange, onChangeMatrix }) => {
    function rulesValue(value: any) {
        if (value === '') return 0;
        return value;
    }
    return (
        <InputNumber
            min={0}
            value={getValue({ data: cell }) || 0}
            onChange={(value: any) => {
                onChange({ ...cell, value: rulesValue(value) });
                onChangeMatrix(rulesValue(value));
            }}
            inputMode="numeric"
            placeholder="Valeur"
            type="number"
        />
    );
};

export default RangeEdit;
