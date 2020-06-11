import * as React from 'react';

interface RangeViewProps {
    cell: any;
    getValue: any;
}

const RangeView: React.FC<RangeViewProps> = ({ cell, getValue }) => (
    <div>{getValue({ data: cell })}</div>
);

export default RangeView;
