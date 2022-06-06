
import React from 'react';
import ReactDOM from 'react-dom'
import PubSubManager from './PubSubManager'

class Subscriber extends React.Component {
  constructor(props) {
    super(props);
    this.refList = [];
    var self = this;
    PubSubManager.subscribe(this.props.topic, function(options) {
    	for (var i=0; i<self.refList.length; i++){
    		ReactDOM.findDOMNode(self.refs[self.refList[i]]).innerHTML = options[self.props.optionField];
    	}
    	
    })
  }
  getId (pre) {
      var v = pre + new Date().valueOf();
      //console.info("v="+v)
      return v;
  }; 
  
  render() {
	  var self = this;
	  const _children = React.Children.map(this.props.children, child => {
		  let id = null;
		  let res = null;
		  if (child.ref) {
			  id = child.ref;
			  res = child;
		  } else {
			  id = self.getId("Sub_");
			  res = React.cloneElement(child, {
		    	  ref: id
		      })
		  }
		  self.refList.push(id);
	      return res;
	    });

	  return (<div>{_children}</div>);
  }  
}

export default Subscriber;

module.exports = Subscriber;