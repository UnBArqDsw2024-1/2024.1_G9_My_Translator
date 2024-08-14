import React from 'react';
import logo from '../assets/logo.svg'
import logoGitHub from '../assets/github.png'

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
            <img src={logo} alt="Logo" style={{ height: '35px', padding: '12px'}} />
                <h1>My Translator</h1>
            </div>
            <div className='logo-github'>
            <a 
                href="https://github.com/UnBArqDsw2024-1/2024.1_G9_My_Translator" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <img src={logoGitHub} alt="GitHub Logo" style={{ height: '50px', 'margin-left':'50rem' }} />
            </a>
            </div>
        </header>
    );
}

export default Header;
