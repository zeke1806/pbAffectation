/* eslint-disable */
import * as React from 'react';
import { Graph } from 'react-d3-graph';

const data = {
    nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
    links: [
        { source: 'Harry', target: 'Sally' },
        { source: 'Harry', target: 'Alice' }
    ]
};

const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: 'lightgreen',
        size: 250,
        highlightStrokeColor: 'blue'
    },
    link: {
        highlightColor: 'lightblue'
    }
};

interface GraphProps {
    GRAPH: any;
}

const MyGraph: React.FC<GraphProps> = ({ GRAPH }) => {
    return (
        <div>
            <Graph id="graph-id" data={GRAPH} config={myConfig} />
        </div>
    );
};

export default MyGraph;
