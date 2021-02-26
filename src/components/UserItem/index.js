import { Component } from 'react'

class UserItem extends Component {
    constructor() {
        super()
        this.state = {
            id: 'id',
            login: 'mojombo',
            avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
            html_url: 'https://github.com/mojombo'
        }
    }
    render() {
        return (
            <div>
                <img src={this.state.avatar_url} alt="" className="round-img"/>
            </div>
        )
    }
}

export default UserItem