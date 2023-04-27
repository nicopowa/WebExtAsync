/**
 * @class ContentScript : base content script
 */
class ContentScript {

	/**
	 * @construct
	 */
	constructor() {

		this.tabId = -1;
		this.port = new ContentPort(this.onMessage.bind(this));
		this.hostname = location.host.replace("www.", "");

	}

	/**
	 * @async
	 * @method start : script startup
	 */
	async start() {

		if(DEBUG) 
			console.log("START CONTENT SCRIPT", this.hostname);

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

		if(DEBUG) 
			console.log(type, "from", name(from), "tab", tabId);

		let result = null;

		switch(type) {

			case "start":
				await this.start();
				result = true;
				break;

		}

		return result;

	}

	static get type() {

		return CONTENT;
		
	}

}