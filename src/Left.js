import React, { Component } from 'react';
import $ from 'jquery'
import './Left.css';
import Publisher from './PubSub/Publisher';
import Right from './Right'
import Inside from './Inside'
import PubSubManager from './PubSub/PubSubManager'

class Left extends Component {
	constructor (props) {
		super(props);
		this.subscriptionMap = {};
	}
	
	componentWillMount() {
		
		//************* Update without React way using jquery **************************
		var topic = "/main/button/bg";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(timeSeriesData) {
			PubSubManager.log("Subscriber in Left receive topic: "+topic+" and data:"+ JSON.stringify(timeSeriesData))
			$(".Left").css({"background-color":timeSeriesData.bgColor});
		}) 
		
		topic = "/right/button/fg";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(timeSeriesData) {
			PubSubManager.log("Subscriber in Left receive topic: "+topic+" and data:"+JSON.stringify(timeSeriesData))
			$(".Left").css({"color":timeSeriesData.color});
			PubSubManager.publish("/published/from/right", timeSeriesData);
		}) 
	}
	componentWillUnmount() {
		var topic = "/main/button/bg";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		
		topic = "/right/button/fg";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
	}
  
  render() {
    return (
      <div className="Left">
        
          <Publisher topic="/left/button/dw" options="{'dw':20}"><button>Button in Left: enlarge width of subscribers</button></Publisher>

         
      </div>
     
    );
  }
}

export default Left;
