class ContentScript {

	constructor() {
		trace("start content script");
		this.tabId = -1;
		this.port = new ContentPort(this.onMessage.bind(this));
	}

	async start() {

	}

	/**
	 * @method onMessage : message received
	 * @param {number} from : background web popup
	 * @param {string} type : message type
	 * @param {*} data : message data
	 * @param {number} tabId : emitter id
	 */
	async onMessage(from, type, data, tabId) {
		trace(type, "from", _name(from), "tab", tabId);
		let result = null;
		switch(type) {
			case "start":
				await this.start();
				result = true;
				break;
		}
		return result;
	}

}