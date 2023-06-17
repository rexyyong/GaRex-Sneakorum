import React, {Component} from 'react'

class Welcome extends Component {
    render() {
        return <h1>Welcome {this.props.name} last name {this.props.lastName}!</h1>
    }
}

export default Welcome