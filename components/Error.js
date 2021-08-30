import React from 'react';

require('./Error.less');

export default function Error({type = '404'}) {
    return (
        <div className="not-found-container">
            <div className="not-found-inner">
                <h1>{type === '500' ? 'Server Error: 500' : '404 - Page Not Found'}</h1>
                <button
                    onClick={(e) => { e.preventDefault(); location.href('/'); }}
                    className="button-current"
                >Take me Home</button>
            </div>
        </div>
    )
}
