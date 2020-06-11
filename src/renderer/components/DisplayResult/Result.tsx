/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import * as React from 'react';
import { Card, Divider } from 'antd';

import Matrix from '../Matrix/Matrix';
import RangeView from '../Matrix/RangeView';
import RangeEdit from '../Matrix/RangeEdit';

require('./result.scss');

interface ResultProps {
    result: any;
}

const Result: React.FC<ResultProps> = ({ result }) => {
    const bindWith = (matrix: any) => {
        return matrix.map((r: any) => {
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
        <div>
            {result.map(function(step: any, i: any) {
                if (step.is_matrix) {
                    return (
                        <div key={i} className="result-matrix-container">
                            <Card title={step.etape} style={{ width: 500 }}>
                                {step.data.map((d: any, i2: any) => (
                                    <div key={i2}>{d}</div>
                                ))}
                                <Divider dashed />
                                <Card.Meta description={step.description} />
                            </Card>
                            <Matrix key={i} data={bindWith(step.matrix)} />
                        </div>
                    );
                }

                if (step.is_graph) return null;

                return <Divider key={i} />;
            })}
        </div>
    );
};

export default Result;
