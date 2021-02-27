import { Component } from 'react'

class SearchBar extends Component {
    render() {
        return (
            <div>
                <form  className="search">
                    <input type="text" name="text" placeholder="Search users" />
                    <input type="submit" value="Search" className="btn" />
                </form>
            </div>
        )
    }
}


export default SearchBar