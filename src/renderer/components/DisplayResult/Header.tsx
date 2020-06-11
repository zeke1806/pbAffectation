import * as React from 'react';
import { Typography, Button } from 'antd';

require('./header.scss');

interface HeaderProps {
    resolve: any;
    reset: any;
}

const Header: React.FC<HeaderProps> = ({ resolve, reset }) => {
    return (
        <div className="container-header">
            <Typography.Title level={4} style={{ color: '#fff' }}>
                Resolution
            </Typography.Title>
            <div>
                <Button type="primary" style={{ marginRight: 5 }} onClick={resolve}>
                    Resoudre
                </Button>
                <Button type="primary" onClick={reset}>
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default Header;
