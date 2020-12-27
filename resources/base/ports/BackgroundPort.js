/**
 * @class BackgroundPort : background port, relay messages between extension scripts
 * @extends {PortBase}
 */
class BackgroundPort extends PortBase {

	/**
	 * @construct
	 * @param {Function} onData : client data callback
	 * @param {Function} onConnect : client connect callback
	 * @param {Function} onDisconnect : client disconnect callback
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
	 * @param {Port} port : connected port
	 */
	async onPortConnect(port) {

		if(port.sender.id != which.runtime.id) {
			console.log("extension", port.sender.id, "not allowed");
			return port.disconnect();
		}
		
		let type = parseInt(port.name, 10);
		if(DEBUG) console.log(name(type), "port connected");

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
	 * @param {Port} port : connected port
	 */
	onExternalPortConnect(port) {
		let type = parseInt(port.name, 10);
		if(DEBUG) console.log(name(type), "port connected");

		switch(type) {
				
			case WEB:
				this.webPorts.set(port.sender.tab.id, port);
				// send self tabId to newly connected web
				break;

			default:

				break;
			
		}

		port.onMessage.addListener((message, port) => this.onPortMessage(message, port, null));
		port.onDisconnect.addListener(this.onPortDisconnect.bind(this));
	}

	/**
	 * @async
	 * @method onPortMessage : message from any port
	 * @param {Object} message : received message
	 * @param {Port} port : message origin port
	 * @param {*} result : 
	 */
	async onPortMessage(message, port, result) {
		//if(DEBUG) console.log(port, result);
		if(message.to !== BACKGROUND) {
			if(DEBUG) console.log("relay", message.type, "to", name(message.to), "ack", message.ack);
			this.send(message.to, message.type, message.data, message.toid, message.ack, message.from, message.fromid);
		}
		else super.onPortMessage(message, port, result);
	}
	
	/**
	 * @method onPortDisconnect : port disconnected (tab or popup close)
	 * @param {Port} port : disconnected port
	 */
	onPortDisconnect(port) {
		let type = parseInt(port.name, 10);
		if(DEBUG) console.log(name(type), "port disconnected");

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
		if(DEBUG) console.log("send", type, "to", name(target), "ack", ack);
		let port = target === CONTENT ? this.contentPorts.get(tabId) : target === WEB ? this.webPorts.get(tabId) : this.popupPort;
		port.postMessage({type: type, from: from, fromid: fromid, to: target, toid: tabId, data: data, ack: ack});
	}

}