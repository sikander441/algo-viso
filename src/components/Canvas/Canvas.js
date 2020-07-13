import React, { Component } from 'react'
import Node from '../Node/Node'
import { Button } from 'react-bootstrap';


export default class Canvas extends Component{

 constructor(props){
   super(props)
   this.state={
     nodes:[]
   }
 }

  render()
  {
    var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363",
    "#85FFC7", "#297373", "#FF8552", "#A40E4C"];
    var nodeName = 65
    var canvasStyle ={
        widht:'200px',
        height:'500px',
        backgroundColor:'#d3d3d3',
        position:'relative',
        
    }


    

    const createNode = ()=>
    { 
      let nodeList = this.state.nodes;
      nodeList.push( (<Node bgColor={colors[nodeList.length%7]} name={String.fromCharCode(nodeList.length+65)} />) )
      this.setState(nodeList);

    }

    return (
        
        <div style={canvasStyle}>
          <center><Button variant="secondary" onClick={()=>createNode()}>Create a Node</Button>{' '}</center>
        {this.state.nodes.map( node => {
          return node
        })}
    
        </div>
       
      );
  }
    
}