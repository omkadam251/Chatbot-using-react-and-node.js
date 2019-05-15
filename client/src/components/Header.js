import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav>
        <ul>
            <li><Link to={'/admission'}>Admission</Link></li>
            <li><Link to={'/about'}>About us</Link></li>
        </ul>
    </nav>
)

export default Header;