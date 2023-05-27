import React from 'react';

import './index.css'

const Index = () => {
    const getTime = React.useCallback(() => {
        const date = new Date();
        return date.getHours() + ':' + date.getMinutes()
    }, [])

    return (
        <div className="fake-status">
            <time className="date-time">{getTime()}</time>
            <div className="status">
                <div className="batery">
                    <span></span>
                </div>
                <div className="signal">
                    <span></span><span></span><span></span><span></span>
                </div>
                <div className="wifi">
                    <span>
                        <span>
                            <span></span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Index