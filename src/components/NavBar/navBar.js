import React from 'react';
import './navBar.css';

export default function navBar () {
    return (
        <ul className="nav-bar">
            <li className="active">Data Table</li>
            <li>Reporting</li>
        </ul>
    );
}