/**
 * @class ContentScript : 
 */
class ContentScript {

	/**
	 * @construct
	 */
	constructor() {
		this.tabId = -1;
		this.port = new ContentPort(this.onMessage.bind(this));
	}

	/**
	 * @async
	 * @method start : 
	 */
	async start() {
		if(DEBUG) trace("START CONTENT SCRIPT");
	}

	/**
	 * @async
	 * @method onMessage : message received
	 * @param {number} from : background web popup
	 * @param {string} type : message type
	 * @param {*} data : message data
	 * @param {number} tabId : emitter id
	 */
	async onMessage(from, type, data, tabId) {
		if(DEBUG) trace(type, "from", name(from), "tab", tabId);
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