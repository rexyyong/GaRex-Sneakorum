import React from 'react'


const Greet = (props) => {
    console.log(props)
    return < h1 > Hello {props.name} last name {props.lastName} </h1 >
}
export default Greet