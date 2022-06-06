import React, { Component } from 'react';
import $ from 'jquery'
import './Right.css';
import Publisher from './PubSub/Publisher';
import PubSubManager from './PubSub/PubSubManager'

class Right extends Component {
	constructor (props) {
		super(props);
		this.state = {
				style: {
					backgroundColor: "#EDEDEE",
					color:"#000",
					width:"300px",
					height:"200px"
				}
				
		}
		this.subscriptionMap = {};
	}
	
	setComponentState(mm) {
		console.log(mm.height)
		this.setState({"style":{
			backgroundColor: mm.backgroundColor?mm.backgroundColor:this.state.style.backgroundColor,
			color:mm.color?mm.color:this.state.style.color,
			width:mm.width?mm.width:this.state.style.width,
			height:mm.height?mm.height:this.state.style.height
		}})
		console.log(this.state.style.height)
	}
	
	componentWillMount() {
		var self = this;
		var topic = "/main/button/bg";
		
		//************* Update with React way using setState **************************
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(options) {
			PubSubManager.log("Subscriber in Right receive topic: "+topic+" and data:"+JSON.stringify(options));
			//$(".Right").css({"background-color":options.bgColor});
			self.setComponentState({"backgroundColor":options.bgColor});
	  
		})
		topic = "/published/from/right";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(data) {
			PubSubManager.log("Subscriber in Left receive topic: "+topic+" and data:"+JSON.stringify(data))
		}) 
		
		topic = "/left/button/dw";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(options) {
			PubSubManager.log("Subscriber in Right receive topic: "+topic)
			//$(".Right").width($(".Right").width()+options.dw)
			var ww = self.state.style.width.indexOf("px");
			ww = parseInt(self.state.style.width.substring(0, ww)); 
			ww +=options.dw;
			self.setComponentState({"width":ww+"px"});
		}) 
		
		topic = "/left/MouseOver/randomColor";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(options) {
			PubSubManager.log("Subscriber in Right receive topic: "+topic)
			//$(".Right").css({"background-color":PubSubManager.getRandomColor()})
			self.setComponentState({"backgroundColor":PubSubManager.getRandomColor()});
		})
		
		topic = "/left/dropdown/bg";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(options) {
			PubSubManager.log("Subscriber in Right receive topic: "+topic)
			//$(".Right").css({"background-color":options.bgColor})
			self.setComponentState({"backgroundColor":options.bgColor});
		})
		  
		topic = "/inside/function/fg";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(options) {
			PubSubManager.log("Subscriber in Right receive topic: "+topic+" options:"+JSON.stringify(options))
			//$(".Right").css({"color":options.color})
			self.setComponentState({"color":options.color});
		})
		  
	}
	
	componentWillUnmount() {
		var topic = "/main/button/bg";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		
		topic = "/published/from/right";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]); 
		
		topic = "/left/button/dw";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]); 
		
		topic = "/left/MouseOver/randomColor";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		
		topic = "/left/dropdown/bg";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		  
		topic = "/inside/function/fg";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		  
	}
  
  render() {
    return (
      <div className="Right" style={this.state.style}>
        <p className="App-intro">
          This is an instance of component "Right"
        </p>
          <Publisher topic="/right/button/fg" options="{'color':'#ff0000'}"><button>Button in Right:change text color of subscribers</button></Publisher>
          <span style={{"fontSize":"11px"}}>This input will will publish topic "/right/text" that will be subscribed by the field at the left (the "Inside" Pane):</span>
          <Publisher topic="/right/text" event="Change" options="{'text':'___VALUE___'}"><input type="text" style={{"margin-top":"7px"}}/></Publisher>
      </div>     
    );
  }
}

export default Right;
