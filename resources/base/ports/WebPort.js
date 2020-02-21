/**
 * @class WebPort : 
 * @extends {PortBase}
 */
class WebPort extends PortBase {

	/**
	 * @construct
	 * @param {function} onData 
	 */
	constructor(onData) {
		super(WEB, onData);
		
	}

	onPortMessage(message) {
		trace("web port message");
		trace(data);
	}

	send(target, type, data, tabId) {
		this.port.postMessage({"type": type, "to": target, "id": tabId, "data": data});
	}
}