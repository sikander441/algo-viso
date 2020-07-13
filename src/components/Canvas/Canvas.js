import React, { Component } from 'react'
import Node from '../Node/Node'
import { Button } from 'react-bootstrap';
import { Line } from 'react-lineto';



export default class Canvas extends Component{

 constructor(props){
   super(props)
   this.state={
     nodes:[],
     isDrawingLine:false,
     edges:[],
     mouseX:0,
     mouseY:0,
     EdgesBetweenNodes:[],
     selectedNode:0,
     nodeSelected:false
   }
 }

 addEdge = (u,v) => {
  var edges=this.state.edges;
  if( edges[u].indexOf(v) === -1 )
   edges[u].push(v);
  this.setState({edges})
 }
 updateEdges = () => {
  this.createEdgeCords();
 }
 createEdgeCords = () =>{
  var edges = this.state.edges;
  var EdgesBetweenNodes = []
  const  nodes = this.state.nodes
 for(var i = 0; i < edges.length; i++ )
 {
   if(edges[i].length === 0)continue;
   var edgeArray = edges[i];
  //  console.log(nodes)
   for(var j = 0 ;j< edgeArray.length ; j++ ){
     
      EdgesBetweenNodes.push({x0:nodes[i].x,y0:nodes[i].y,x1:nodes[edgeArray[j]].x,y1:nodes[edgeArray[j]].y})
   }
 }
 this.setState({EdgesBetweenNodes})
}

  handleCordChange = (idx,x,y)=>{
    var nodesList = this.state.nodes;
    nodesList[idx].x=x+30;
    nodesList[idx].y=y+40;
      this.setState({nodes:nodesList})
      this.createEdgeCords()
    
    // console.log('updated cords' + x+' ' + y);
  }

  clickHandler = (idx) =>{
    if(!this.state.isDrawingLine)
      return
    if(this.state.nodeSelected === true)
    {
      this.addEdge(this.state.selectedNode,idx)
      this.setState({nodeSelected:false})
      this.updateEdges()
    }
    else
    this.setState({nodeSelected:true,selectedNode:idx})

  }
  _onMouseMove(evt) {
    
       var x = evt.screenX + 10 
       var y = evt.screenY - 125
    this.setState({ mouseX:x, mouseY: y});
  }
  render()
  {
    var colors = ["#d3ded3", "#E94F37", "#1C89BF", "#A1D363",
    "#85FFC7", "#297373", "#FF8552", "#A40E4C"];
    var canvasStyle ={
        widht:'100%',
        height:'500px',
        backgroundColor:'#d3d3d3',
        position:'relative',
        
    }


      const releaseLock = () =>{
      var nodeList = this.state.nodes;
          
      nodeList.forEach(element => {
        element.disabled= false ;
      });
      this.setState({nodes:nodeList,isDrawingLine:false,nodeSelected:false});
    }
    
    const disableNodeDrag = () =>{
      var nodeList = this.state.nodes;
      // this.updateEdges();
      nodeList.forEach(element => {
        element.disabled= true ;
      });
      this.setState({nodes:nodeList,isDrawingLine:true});
     // console.log(nodeList)
    }


    const createNode = ()=>
    { 
      let nodeList = this.state.nodes;
      nodeList.push( {
        bgColor:colors[this.state.nodes.length%7],
        name:String.fromCharCode(nodeList.length+65),
        idx:nodeList.length,
        disabled:false,
        x:0,
        y:0
      }
      )
      var edges = this.state.edges;
      edges.push([])
      this.setState({nodes:nodeList,edges});
     // console.log(nodeList);
    }

    
   
  
    return (
      
        <div onMouseMove={this._onMouseMove.bind(this)} style={canvasStyle}>
          {this.state.EdgesBetweenNodes.map(edge =>{
            return  <Line borderColor="#CAC740" borderWidth={3} x0={edge.x0} y0={edge.y0} x1={edge.x1} y1={edge.y1} />
          })}
          {this.state.isDrawingLine && this.state.nodeSelected? ( <Line borderColor="#E2E095" borderWidth={5} borderStyle='dashed' x0={this.state.nodes[this.state.selectedNode].x} y0={this.state.nodes[this.state.selectedNode].y} x1={this.state.mouseX} y1={this.state.mouseY} />):null }
          <center><Button variant="secondary" onClick={()=>createNode()}>Create a Node</Button>
          <Button variant="secondary" onClick={()=>disableNodeDrag()}>Create Links</Button>
          <Button variant="secondary" onClick={()=>releaseLock()}>Release Lock</Button>

          </center>
        {this.state.nodes.map( node => {
          return (<Node 
          bgColor={node.bgColor} 
          name={node.name} 
          idx={node.idx} 
          updateCord={(idx,x,y)=> this.handleCordChange(idx,x,y)}
          clickHandler ={ (idx) => this.clickHandler(idx)}
          disabled = {node.disabled}
           />)
        })}
        
        </div>
       
      );
  }
    
}