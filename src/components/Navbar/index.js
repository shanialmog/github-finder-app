import {Component} from 'react'
import PropTypes from 'prop-types'

class Navbar extends Component {
    static defaultProps = {
        title: 'Github Finder App',
        icon: 'fab fa-github'
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    }

    render() {
        return (
            <nav>
                <h1>
                    <i className={this.props.icon} /> {this.props.title}
                </h1>
            </nav>
        )
    }

}

export default Navbar