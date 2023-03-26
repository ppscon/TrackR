import React from 'react';

const Vehicle = ({ id, coordinates, type }) => {
    const renderIcon = () => {
        switch (type) {
            case 'van':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 9.24c0-.11-.01-.21-.02-.32l-2-7A2.007 2.007 0 0018.02 0H5.98A2.008 2.008 0 004 2.01l-2 6.96c-.01.12-.01.23-.01.35v10C2 19.2 3.8 21 6 21s4-1.8 4-4h4c0 2.2 1.8 4 4 4s4-1.8 4-4v-7.76zM5.5 5h13L19 4H5l.5 1zM16 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-10 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
            );
        case 'truck':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5 8h-3V4c0-1.1-.9-2-2-2H2c-1.1 0-2 .9-2 2v12h2c0 1.7 1.3 3 3 3s3-1.3 3-3h6c0 1.7 1.3 3 3 3s3-1.3 3-3h2v-6l-1.5-2zM6 16.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm12 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM16 8l2 2h-2V8z"/>
                </svg>
            );
        case 'bike':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16c-.56 0-1.03.24-1.41.62l-1.78-1.77-4.34 4.34L12 16l2-2-1.77-1.77c.37-.59.95-1.03 1.6-1.2L14 6h2V4H9v2h1.6l1 6-3.6 3.6L7 16l3.6-3.6L12 14l2-2-3.6-3.6L11 6l1-6h2v2l2.4 2.4c.65-.27 1.33-.4 2-.4 2.76 0 5 2.24 5 5 0 1.95-1.12 3.62-2.8 4.4z"/>
                    <circle cx="6.5" cy="16.5" r="1.5"/>
                    <circle cx="15.5" cy="16.5" r="1.5"/>
                </svg>
            );
            default:
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.92 6.01A2.009 2.009 0 0017 5H7c-1.1 0-2 .9-2 2v6h2c0 1.1.9 2 2 2s2-.9 2-2h4c0 1.1.9 2 2 2s2-.9 2-2h2V9l-.08-.99zM7 11V7h10v4H7z"/>
                        <circle cx="8.5" cy="16.5" r="1.5"/>
                        <circle cx="15.5" cy="16.5" r="1.5"/>
                    </svg>
                );
        }
    };

    return (
        <div className={`vehicle vehicle-${type}`} id={`vehicle-${id}`} style={{ left: coordinates.x, top: coordinates.y }}>
            {renderIcon()}
        </div>
    );
};

export default Vehicle;