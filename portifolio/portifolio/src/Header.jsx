import React from 'react';

export default function Header() {
    return (
        <header className="navbar">
            <div className="nav-container">
                <div className="brand">
                    <span className="brand-icon">⚡</span>
                    <h1 className="brand-title">
                        Getu<span className="highlight">Tesfaye</span>
                    </h1>
                </div>


                <nav className="nav-links">
                    <a href="#about" className="nav-links Active">About</a>
                    <a href="#projects" className="nav-link">projects</a>
                    <a href="#contact" className="nav-link">contact</a>
                </nav>
            </div>
        </header>

        
    )
}