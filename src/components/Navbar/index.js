import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = ({ title, icon }) => {
    return (
        <nav>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </nav>
    )
}

Navbar.defaultProps = {
    title: 'Github Finder App',
    icon: 'fab fa-github'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar