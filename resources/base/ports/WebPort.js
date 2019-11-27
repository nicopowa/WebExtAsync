class WebPort {

	constructor() {
		this.tabid = 0;
		
		this.port = which.runtime.connect({name: "web"});
		this.port.onMessage.addListener(this.onPortMessage.bind(this));
	}

	onPortMessage(message) {
		trace("web port message");
		trace(data);
	}

	send(target, type, data, tabId) {
		this.port.postMessage({"type": type, "to": target, "id": tabId, "data": data});
	}
}