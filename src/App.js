import React, { Component } from 'react';
import './App.css';
import MobileCallsDashboard from './MobileCallsDashboard';
import Left from './Left';
import Right from './Right';
import Publisher from './PubSub/Publisher';
import PubSubManager from './PubSub/PubSubManager'

class App extends Component {
	constructor (props) {
		super(props);
		this.subscriptionMap = {};
	}
	
	componentWillMount() {
		/*
		var topic = "/left/Publish";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(options) {
			PubSubManager.log("Subscriber in main receive topic: "+topic)
		}) 
		*/

		var topic = "/mobileCalls/Publish";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(options) {
			PubSubManager.log("Subscriber in main receive topic: "+topic)
		}) 
	}
	componentWillUnmount() {
		/*
		var topic = "/left/Publish";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		*/

		var topic = "/mobileCalls/Publish";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
	}
	componentDidMount() {
		//PubSubManager.setLog("log");
	}
  
  render() {
	var self = this;
    return (
      <div className="App">
        <div>
          <h2>Phone calls Dashboard in Singapore</h2>
        </div>
          <MobileCallsDashboard/>
          <Left/>
          <Right/>
      </div>
     
    );
  }
}

export default App;
