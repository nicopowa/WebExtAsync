/**
 * @class WebPort : 
 * @extends {PortBase}
 */
class WebPort extends PortBase {

	/**
	 * @construct
	 * @param {Function} onData 
	 */
	constructor(onData) {
		super(WEB, onData);
		
	}

	/**
	 * @override
	 * @async
	 * @method onPortMessage : message from any port
	 * @param {Object} message : 
	 * @param {Port} port : 
	 * @param {*} result : 
	 */
	async onPortMessage(message, port, result) {

		if(message.type === "info") { // && message.from == BACKGROUND

			this.tabId = message.data;
			console.log("this is tab", this.tabId);
			result = this.tabId;

		}

		await super.onPortMessage(message, port, result);

	}

	send(target, type, data, tabId) {

		this.port.postMessage({
			"type": type, 
			"to": target, 
			"id": tabId, 
			"data": data
		});

	}

}