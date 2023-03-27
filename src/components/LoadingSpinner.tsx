import React from 'react';

export default function LoadingSpinner() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
