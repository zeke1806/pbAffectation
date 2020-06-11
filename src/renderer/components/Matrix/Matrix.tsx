import * as React from 'react';

const Spreadsheet = require('react-spreadsheet').default;

interface MatrixProps {
    data: object[][];
}

const Matrix: React.FC<MatrixProps> = ({ data }) => {
    return <Spreadsheet data={data} />;
};

export default Matrix;
