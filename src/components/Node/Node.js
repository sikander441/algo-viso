import React, { Component } from 'react'
import './Node.css'
import Draggable from 'react-draggable';

class Node extends Component{
    

    state={
        x:this.props.x,
        y:this.props.y,
    }

    handleDrag = (e, ui) => {
        this.props.updateCord(this.props.idx,e.x,e.y)
       
        this.setState({
            x: e.x,
            y: e.y,
        });
      };

    render(){
        
        var circleStyle = {
        background: `radial-gradient(circle at 20px 30px, ${this.props.bgColor}, #000)`,
        borderRadius: "50%",
        width:70,
        height:70,
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
        <div className="nodeClass" style={circleStyle} onClick={ () => this.props.clickHandler(this.props.idx)}>
        
            <span style={textStyle}  >{this.props.name}</span>
        </div>
        
        </Draggable>
       
    )

    }

        
    
}


export default Node
