class PortBase {

	/**
	 * 
	 * @param {number} type : background content web popup
	 * @param {function} onData : data callback
	 * @param {function} onConnect : connect callback
	 */
	constructor(type, onData, onConnect) {

		this.type = type;
		this.onData = onData;
		this.onConnect = onConnect;
		
		this.ack = 0;
		this.promises = new Map();

		this.tabId = -1;

		if(this.type == BACKGROUND) return;

		this.port = which.runtime.connect({name: this.type.toString()});
		this.port.onMessage.addListener((message, port) => this.onPortMessage(message, port, null));
	}

	/**
	 * @method onPortMessage : message from any port
	 * @param {Object} message : 
	 * @param {*} port : 
	 * @param {*} result : 
	 */
	async onPortMessage(message, port, result) {
		//trace(message, result);
		if(message.type == "ack") {
			if(this.promises.has(message.data.ack)) {
				this.promises.get(message.data.ack)(message.data.result);
				this.promises.delete(message.data.ack);
			}
		}
		else if(result === null) result = await this.onData(message.from, message.type, message.data, message.fromid);
		if(message.ack) this.send(message.from, "ack", {ack: message.ack, result: result}, message.fromid);
	}

	/**
	 * @method send : send message to given port
	 * @param {number} target : target port type (content web popup)
	 * @param {string} type : message type
	 * @param {*} data : message data
	 * @param {number} tabId : tabId if target content or web
	 * @param {number} ack : if != 0 need ack plz
	 */
	send(target, type, data, tabId = -1, ack = 0) {
		if(DEBUG) trace("send", type, "to", _name(target), "ack", ack);
		this.port.postMessage({type: type, from: this.type, fromid: this.tabId, to: target, toid: tabId, data: data, ack: ack});
	}

	/**
	 * @method wait : promisify message sending
	 * @param {number} target : target port type (content web popup)
	 * @param {string} type : message type
	 * @param {*} data : message data
	 * @param {number} tabId : tabId if target content or web
	 */
	wait(target, type, data, tabId = -1) {
		let ack = ++this.ack, prom = new Promise(resolve => this.promises.set(ack, resolve));
		this.send(target, type, data, tabId, ack);
		return prom;
	}
}