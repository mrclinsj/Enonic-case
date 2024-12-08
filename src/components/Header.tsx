import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <nav>
                        <NavLink to="https://www.boredbutton.com/" target='blank'>
                <img className='logo' src="/movie.svg" alt="Logo" />
            </NavLink>
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}
            >
                Home
            </NavLink>
            <NavLink 
                to="/p/" 
                className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}
            >
                People
            </NavLink>
            <NavLink 
                to="/m/" 
                className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}
            >
                Movies
            </NavLink>
        </nav>
    );
}
