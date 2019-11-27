class BackgroundPort extends PortBase {

	/**
	 * 
	 * @param {function} onData : client data callback
	 * @param {*} onConnect : client connect callback
	 * @param {*} onDisconnect : client disconnect callback
	 */
	constructor(onData, onConnect, onDisconnect) {
		super(BACKGROUND, onData, onConnect);
		
		this.onDisconnect = onDisconnect;

		this.contentPorts = new Map();
		this.webPorts = new Map();
		this.popupPort = null;

		which.runtime.onConnect.addListener(this.onPortConnect.bind(this));
		which.runtime.onConnectExternal.addListener(this.onExternalPortConnect.bind(this));
	}

	/**
	 * @method onPortConnect : new port connected (content or popup)
	 * @param {*} port : 
	 */
	async onPortConnect(port) {
		if(port.sender.id != which.runtime.id) {
			trace("extension", port.sender.id, "not allowed");
			return port.disconnect();
		}
		
		let type = parseInt(port.name, 10);
		trace(_name(type), "port connected");

		port.onMessage.addListener((message, port) => this.onPortMessage(message, port, null));
		port.onDisconnect.addListener(this.onPortDisconnect.bind(this));
		
		switch(type) {
			
			case CONTENT:
				this.contentPorts.set(port.sender.tab.id, port);
				this.onConnect(await this.wait(CONTENT, "info", port.sender.tab.id, port.sender.tab.id));
				this.send(CONTENT, "start", null, port.sender.tab.id);
				break;
				
			case POPUP:
				this.popupPort = port;
				await this.wait(POPUP, "info", [...this.contentPorts.keys()]); // or just send ?
				this.send(POPUP, "start", null);
				break;
			
		}
	}

	/**
	 * @method onExternalPortConnect : new external port connected (web)
	 * @param {*} port : 
	 */
	onExternalPortConnect(port) {
		let type = parseInt(port.name, 10);
		trace(_name(type), "port connected");

		switch(type) {
				
			case WEB:
				this.webPorts.set(port.sender.tab.id, port);
				// send self tabId to newly connected web
				break;
			
		}

		port.onMessage.addListener((message, port) => this.onPortMessage(message, port, null));
		port.onDisconnect.addListener(this.onPortDisconnect.bind(this));
	}

	/**
	 * @method onPortMessage : message from any port
	 * @param {Object} message : 
	 * @param {*} port : 
	 * @param {*} result : 
	 */
	async onPortMessage(message, port, result) {
		//trace(port, result);
		if(message.to !== BACKGROUND) {
			if(DEBUG) trace("relay", message.type, "to", _name(message.to), "ack", message.ack);
			this.send(message.to, message.type, message.data, message.toid, message.ack, message.from, message.fromid);
		}
		else super.onPortMessage(message, port, result);
	}
	
	/**
	 * @method onPortDisconnect : port is disconnected (tab or popup close)
	 * @param {*} port 
	 */
	onPortDisconnect(port) {
		let type = parseInt(port.name, 10);
		trace(_name(type), "port disconnected");

		switch(type) {
			case CONTENT:
				this.contentPorts.delete(port.sender.tab.id);
				this.onDisconnect(port.sender.tab.id);
				break;

			case WEB:
				this.webPorts.delete(port.sender.tab.id);
				break;

			case POPUP:
				this.popupPort = null;
				break;
		}
	}

	/**
	 * @override
	 * @method send : send message to given port
	 * @param {number} target : target port type (content web popup)
	 * @param {string} type : message type
	 * @param {*} data : message data
	 * @param {number} tabId : tabId if target content or web
	 * @param {number} ack : if != 0 need ack plz
	 * @param {number} from : emitter type (background content web popup) | defaults to background for message relays
	 * @param {number} fromid : emitter id if available
	 */
	send(target, type, data, tabId = -1, ack = 0, from = BACKGROUND, fromid = -1) {
		// no super call
		if(DEBUG) trace("send", type, "to", _name(target), "ack", ack);
		let port = target === CONTENT ? this.contentPorts.get(tabId) : target === WEB ? this.webPorts.get(tabId) : this.popupPort;
		port.postMessage({type: type, from: from, fromid: fromid, to: target, toid: tabId, data: data, ack: ack});
	}

	

}