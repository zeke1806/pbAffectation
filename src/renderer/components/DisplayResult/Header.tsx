import * as React from 'react';
import { Typography, Button } from 'antd';

require('./header.scss');

interface HeaderProps {
    resolve: any;
    reset: any;
    onLoad: boolean;
    result: any;
}

const Header: React.FC<HeaderProps> = ({ resolve, reset, onLoad, result }) => {
    return (
        <div className="container-header">
            <Typography.Title level={4} style={{ color: '#fff' }}>
                Resolution
            </Typography.Title>
            <div>
                <Button
                    type="primary"
                    style={{ marginRight: 5 }}
                    onClick={resolve}
                    loading={onLoad}
                >
                    Resoudre
                </Button>
                <Button type="primary" style={{ marginRight: 5 }} onClick={reset}>
                    Reset
                </Button>
                <Button type="primary" disabled={result.length === 0}>
                    Graph
                </Button>
            </div>
        </div>
    );
};

export default Header;
