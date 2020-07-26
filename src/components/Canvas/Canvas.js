import React, { Component } from 'react'
import Node from '../Node/Node'
import { Button } from 'react-bootstrap';
import { Line } from 'react-lineto';
import Edge from '../Edge/Edge'



class Queue 
{ 
    constructor() 
    { 
        this.items = []; 
    } 

    enqueue(element) 
    {     
        this.items.push(element); 
    } 
    dequeue() 
    { 
      if(this.isEmpty()) 
          return "Underflow"; 
      return this.items.shift(); 
    } 
    front()
    {
      if(this.isEmpty()) 
        return "No elements in Queue"; 
      return this.items[0];
    }
    isEmpty() 
    { 
      return this.items.length === 0; 
    } 
                  
} 

class Stack 
{ 
    constructor() 
    { 
        this.items = []; 
    } 

    push(element) 
    {     
        this.items.push(element); 
    } 
    pop() 
    { 
      if(this.isEmpty()) 
          return "Underflow"; 
      return this.items.pop(); 
    } 
    front()
    {
      if(this.isEmpty()) 
        return "No elements in Queue"; 
      return this.items[this.items.length-1];
    }
    isEmpty() 
    { 
      return this.items.length === 0; 
    } 
                  
} 
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
     nodeSelected:false,
     yDiff:0,
   }
   
 }

 componentDidMount(){


   this.setState({yDiff:window.screenY}) 
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
  var edgeRefs = []
  const  nodes = this.state.nodes
 for(var i = 0; i < edges.length; i++ )
 {
   if(edges[i].length === 0)continue;
   var edgeArray = edges[i];
  //  console.log(nodes)
   for(var j = 0 ;j< edgeArray.length ; j++ ){
      edgeRefs.push(React.createRef())
      EdgesBetweenNodes.push(<Edge ref={edgeRefs[edgeRefs.length-1]} borderColor="#f69e7b" node1={ nodes[i].name } node2={nodes[edgeArray[j]].name} x0={nodes[i].x} y0={nodes[i].y} x1={nodes[edgeArray[j]].x } y1={nodes[edgeArray[j]].y} />)
   }
 }
 this.setState({EdgesBetweenNodes,edgeRefs})
}

  handleCordChange = (idx,x,y)=>{
    var nodesList = this.state.nodes;
    nodesList[idx].x=x;
    nodesList[idx].y=y;
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
  _onMouseMove = (evt) => {
    
    this.setState({ mouseX: evt.pageX+10 , mouseY: evt.pageY+10 });
  }
  render()
  {
    
    var canvasStyle ={
        widht:'100%',
        height:'100vh',
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
        bgColor:"#ffe4e4",
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
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const calculateBfsNodeList = () => {
      const edges = this.state.edges
      const source = 0
      var q = new Queue();
      q.enqueue({first:source,second:source});
      var visitedArray = Array(edges.length).fill(false);
      var finalArray = []
      visitedArray[source]=true
      while(!q.isEmpty())
      { 
        finalArray.push(q.front())
        const nodeNum = q.dequeue().second;
        edges[nodeNum].forEach( edge => {
          if(!visitedArray[edge]){
            q.enqueue({first:nodeNum,second:edge});
            visitedArray[edge]=true;
          }
        });
      }
      return finalArray
    }

    const calculateDfsNodeList = () => {
      const edges = this.state.edges
      const  source = 0
      var st = new Stack();
      st.push({first:source,second:source})
      var visitedArray = Array(edges.length).fill(false);
      var finalArray = []
      visitedArray[source]=true
      while(!st.isEmpty())
      {
        finalArray.push(st.front())
        visitedArray[st.front().second]=true;
        const nodeNum = st.pop().second;
        edges[nodeNum].forEach( edge => {
          if(!visitedArray[edge]){
            st.push({first:nodeNum,second:edge});
          }
        })
      }

      console.log(finalArray)
      return finalArray

    }


    const runBfs = async () =>{
      const nodeList = calculateBfsNodeList()
      animateAlgorithm(nodeList)
    }

    const runDfs = async () =>{
      const nodeList = calculateDfsNodeList()
      animateAlgorithm(nodeList)
    }
    const animateAlgorithm = async (nodeList) =>{
     
      var  EdgesBetweenNodes=this.state.EdgesBetweenNodes
      var nodes = this.state.nodes
      nodes[0].bgColor="#93b5e1"
      this.setState({nodes}) 
      for(var i=0; i< nodeList.length; i++ )
      {
        console.log(i)
        console.log(nodeList[i].first+"--"+nodeList[i].second)
        const node1 = nodes[nodeList[i].first].name
        const node2 = nodes[nodeList[i].second].name
        console.log(node1 + " : " + node2)
        for(let j=0;j<EdgesBetweenNodes.length; j++){
          if(  (node1 === EdgesBetweenNodes[j].props.node1 && node2 === EdgesBetweenNodes[j].props.node2))
            {
                const nodes = this.state.nodes
                this.state.edgeRefs[j].current.changeColor()   
                await delay(1500)   
                nodes[nodeList[i].second].bgColor="#93b5e1"
                this.setState({nodes})  
                await delay(200)
            }
        }
      }

      
    }
    

  
    return (
      
        <div onMouseMove={ this._onMouseMove } style={canvasStyle}>
          {this.state.EdgesBetweenNodes.map(edge =>{
            return  edge
          })}
          {this.state.isDrawingLine && this.state.nodeSelected? ( <Line borderColor="#f69e7b" borderWidth={3} borderStyle='dashed' x0={this.state.nodes[this.state.selectedNode].x} y0={this.state.nodes[this.state.selectedNode].y} x1={this.state.mouseX} y1={this.state.mouseY} />):null }
          <center>
          <div className="btn-group">
            <Button  onClick={()=>createNode()}>Create a Node</Button>
            <Button   onClick={()=>disableNodeDrag()}>Draw Edges</Button>
            <Button  onClick={()=>releaseLock()}>Release Lock</Button>
            <Button  onClick={()=>runBfs()}>RUN BFS</Button>
            <Button  onClick={()=>runDfs()}>RUN DFS</Button>
          </div>
         

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