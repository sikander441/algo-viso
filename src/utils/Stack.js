export default class Stack 
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