
import $ from 'jquery'

/*class Pub {
	constructor(topicName, options) {
		this.anchor = options.anchor;
		this.id = options.id;
		this.event = options.event;
		$(options.anchor).on(options.event, function() {
			this.publish(topicName, options);
		});
	}
}
*/
class Sub {
	constructor(id, owner, handler, param) {
		this.id = id;
		if (typeof owner === "function") {
			this.callback = owner;
		} else {
			this.owner = owner;
			this.handler = handler;
		}
		this.param = param ||{};
	}
}


class Topic {
	constructor(name) {
		this.name = name;
		this.subMap = {};
		this.pubMap = {};
	}
}


class _PubSubManager {
	constructor () {
		this.topicMap = {};
		this.handlerMap = {};
	}
	subscribe(topicNameList, options) {
		options = options || {};
		//console.log("<<==== subscribe: topic=" + topicName);
		//if (topicName=="/template/update") {
		//	var kk=0;
		//}
		if ($.isFunction(options) ) {
			var opt = {};
			opt.callback = options;
			options = opt;
		}
		if (!$.isArray(topicNameList) ) {
			topicNameList = [topicNameList];
		}
		for (var i=0; i<topicNameList.length; i++) {
			var tn = topicNameList[i];
			var topic = PubSubManager.topicMap[tn];
			if (topic == null) {
				topic = PubSubManager.topicMap[tn] = new Topic(tn);
			}
			if (options.id === undefined || options.id === "") {
				options.id = this.getId("ID_");
			}
			if (options.callback !== undefined) {
				topic.subMap[options.id] = new Sub(options.id,
						options.callback, null, options.param);
				//console.log ("subscribing: sub.id="+options.id + " callback:"+options.callback.toString().substring(0, 190))
			} else {

				
				topic.subMap[options.id] = new Sub(options.id,
						options.owner, options.handler, options.options);
			}
		}
		

	}
	publish(topicName, options) {
		//console.debug("enter publish:"+topicName)
		//if (topicName=="/applicationService/loadApplications") {
		//	debugger
		//}
		var topic = PubSubManager.topicMap[topicName];
		
		//if (debug>0 && topicName.indexOf("/debug")<0) {
		//	debugInfo.addEvent(topicName, options);	
			
		//}
		
		if (topic === undefined) {
			
			PubSubManager.topicMap[topicName] = new Topic(
					topicName);
			
			this.log("######WARNING######: there is no subscriber on topic '"+topicName+"'");
			return;
		}

		console.log("Publish topic: " + topic.name)
alert("topic.name: "+topic.name);
alert("options: "+options);
alert("Value: "+JSON.stringify(options));

		if (topic === "/mobileCalls/Publish") {
			alert("Yahooooo")
		}







		options = options || {};
		
		for ( var s in topic.subMap) {
			var sub = topic.subMap[s];
			if (sub.param.skip) {
				if (sub.param.skip()) {
					continue;
				}
			}
			//console.log("  ===>process sub=" + sub.id)
			// options.sub = sub;
			if (sub.param) {
				$.extend(options, sub.param);
			}

			if (sub.callback) {
				//console.log("  invoke sub: id=" + sub.id + " callback="
						//+ sub.callback.toString().substring(0, 190));
				var target = window;
				if (sub.owner && window[sub.owner]) {
					target = window[sub.owner];
				}
				sub.callback.apply(target, [ options ]);
				
			} else if (sub.ownerType === "handlerMap") {
				var item = PubSubManager.handlerMap[sub.owner];
				item.method.apply(item.owner, options);
			} else {
				//console.log("  invoke sub: id=" + sub.id + " owner="
						//+ sub.owner + " handler=" + sub.handler)
				if (sub.owner && window[sub.owner]) {
					if (sub.handler && window[sub.owner][sub.handler]) {
						window[sub.owner][sub.handler].apple(
								window[sub.owner], [ options ]);
					}
				}
				if (window[sub.handler]) {
					window[sub.handler].apply(window, [ options ]);
				}
			}

		}
		
	}
	publishSequntially(topicName, options) {
		if (options.optionsList.length<1) {
			if (options.doneTopics) {
				this.publish(options.doneTopics);
			}
			return;
		}

		var opt = options.optionsList.shift();
		opt.noConfirm = options.noConfirm;
		opt.callback = function() {
			this.publishSequntially(topicName, options);
		}
		this.publish(topicName, opt);
	}
	
	getId(pre) {
		var v = pre+new Date().valueOf();
		console.info("v="+v)
		return v;
	}
	
	setLog(id) {
		this.loggerId = id;
	}
	
	log(msg) {
		console.log(msg);
		if (this.loggerId===undefined) {
			return;
		}
		if (this.logger===undefined) {
			this.logger = $("#"+this.loggerId);
		}
		
		this.logger.val(function(_, val){return val + "\n\n\n"+msg; }); 
		this.logger[0].scrollTop = this.logger[0].scrollHeight;
	}
	
	getRandomColor() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}
}

const PubSubManager = new _PubSubManager()
export default PubSubManager;