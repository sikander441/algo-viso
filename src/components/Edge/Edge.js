import React, { Component } from 'react'
import { Line } from 'react-lineto';
import './Edge.css'


class Edge extends Component {

    state={
        x0:this.props.x0,
        y0:this.props.y0,
        x1:this.props.x1,
        y1:this.props.y1,
        node1:this.props.node1,
        node2:this.props.node2,
        borderColor:this.props.borderColor || "#C2E095",
        borderWidth:this.props.borderWidth ||  5
    }


     changeColor = () =>{
        this.setState({
            borderColor:"#383e56"
        })
    }
    componentWillReceiveProps(){
        this.setState({
            x0:this.props.x0,
            y0:this.props.y0,
            x1:this.props.x1,
            y1:this.props.y1,
            node1:this.props.node1,
            node2:this.props.node2,
            borderColor:this.props.borderColor || "#C2E095",
            borderWidth:this.props.borderWidth ||  5
        })
    }

    render(){

        return  <Line className="LineClass" borderColor={this.state.borderColor}  borderWidth={this.state.borderWidth} x0={this.state.x0} y0={this.state.y0} x1={this.state.x1} y1={this.state.y1} />
    }
    
}

export default Edge