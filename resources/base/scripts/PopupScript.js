/**
 * @class PopupScript : base popup script
 */
class PopupScript {

	/**
	 * @construct
	 */
	constructor() {

		this.port = new PopupPort(this.onMessage.bind(this));

	}

	/**
	 * @async
	 * @method start : script startup
	 */
	async start() {

		if(DEBUG) 
			console.log("START POPUP SCRIPT");

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

		return POPUP;
		
	}
	
}