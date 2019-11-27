class ContentPort extends PortBase {

	constructor(onData) {
		super(CONTENT, onData);
	}

	/**
	 * @method onPortMessage : message from any port
	 * @param {Object} message : 
	 * @param {*} port : 
	 * @param {*} result : 
	 */
	async onPortMessage(message, port, result) {
		if(message.type === "info") { // && message.from == BACKGROUND
			this.tabId = message.data;
			trace("this is tab", this.tabId);
			result = this.tabId;
		}
		await super.onPortMessage(message, port, result);
	}

}