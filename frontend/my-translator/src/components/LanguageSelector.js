import React from 'react';
import '../LanguageSelector.css';

const LanguageSelector = () => {
    return (
        <div className="language-selector">
            <div className="select-container">
                <select className="language-select">
                    <option value="en">Inglês</option>
                </select>
            </div>
            <div className="swap-icon">
                <span>⇄</span>
            </div>
            <div className="select-container">
                <select className="language-select">
                    <option value="pt">Português</option>
                </select>
            </div>
        </div>
    );
};

export default LanguageSelector;
