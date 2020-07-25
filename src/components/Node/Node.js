import React, { Component } from 'react'
import './Node.css'
import Draggable from 'react-draggable';

class Node extends Component{
    

    state={
        x:this.props.x,
        y:this.props.y,
    }

    handleDrag = (e, ui) => {
        this.props.updateCord(this.props.idx,ui.x,ui.y)
        this.setState({
            x: ui.x,
            y: ui.y,
        });
      };

    render(){
        
        var circleStyle = {
        background: `radial-gradient(circle at 20px 30px, ${this.props.bgColor}, #000)`,
        borderRadius: "50%",
        width:75,
        height:75,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:this.props.y,
        left:this.props.x,
        color:'white',
      };
      var textStyle = {
         fontSize:'24px'
      }
    return (
        <Draggable  disabled={this.props.disabled} defaultPosition={{x: 2, y: 0}} bounds = "parent" onDrag={this.handleDrag}>
        <div style={circleStyle} onClick={ () => this.props.clickHandler(this.props.idx)}>
        
            <span style={textStyle}  >{this.props.name}</span>
        </div>
        
        </Draggable>
       
    )

    }

        
    
}


export default Node
