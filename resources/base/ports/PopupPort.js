class PopupPort extends PortBase {

	constructor(onData) {
		super(POPUP, onData);
		this.tabs = [];
	}

	/**
	 * @method onPortMessage : message from any port
	 * @param {Object} message : 
	 * @param {*} port: 
	 * @param {*} result : 
	 */
	async onPortMessage(message, port, result) {
		result = super.onPortMessage(message, port, result);
		if(message.type === "info") {
			this.tabs = message.data;
			trace("tabs", this.tabs);
		}
	}

}