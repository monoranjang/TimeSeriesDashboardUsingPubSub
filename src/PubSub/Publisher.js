
import React from 'react';
import $ from 'jquery'
import PubSubManager from './PubSubManager'

class Publisher extends React.Component {
  constructor(props) {
    super(props);
    
    this.publish = this.publish.bind(this);
    if (props.classes) {
    	var cn = [];
    	for (var c in props.classes) {
    		cn.push(c);
    	}
    	this.ppp.className = cn.join(" ");
    }
    this.event = "Click";
    if (props.event) {
    	this.event = props.event;
    }
    
  }
  
  publish(e) {
	  console.log("publishing:"+this.props.topic+" event:"+this.props.event)
	  var options = {};
	  if (this.props.options) {
		  options = eval("("+this.props.options+")")
		  for (var i in options) {
			  var item = options[i];
			  if (item==="___VALUE___") {
				  var $this = $(e.target);
				  options[i] = $(e.target).val();
			  } else if (item["___FUNCTION___"]!==undefined && this.props.owner!==undefined) {
				  options[i] = this.props.owner[item["___FUNCTION___"]]();
			  }
		  }
	  }
	  PubSubManager.publish(this.props.topic, options);
  }
  
  render() {
	  var self = this;
	  var notFound = false;
	  var children = React.Children.map(this.props.children, function (c, index) {		  
		  var ppp = $.extend({}, c.props);
		  ppp["on"+self.event] = self.publish;
		  var ccc = React.DOM[c.type];
		  if (ccc) {
			  return ccc(ppp);
		  } else {
			  notFound = true;
			  return c;
		  }
		  
      });
	  if (notFound) {
		  var ppp = {};
		  if (self.props.classes) {
	    	var cn = [];
	    	for (var c in self.props.classes) {
	    		cn.push(c);
	    	}
	    	ppp.className = cn.join(" ");
	      }

	      if (self.props.event) {
	    	ppp["on"+self.props.event] = function() {
	    		self.publish();
	    	}
	      } else {
	    	ppp["onClick"] = self.publish;
	      }
		  return <div { ...ppp } >{self.props.children}</div>;
	  } else {
		  return (
				  <div>
				  {children}
				  </div>
		    );
	  }
	  
  }
}

export default Publisher;

module.exports = Publisher;