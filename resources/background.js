/**
 * @class ExtensionBackgroundScript : 
 * @extends {BackgroundScript}
 */
class ExtensionBackgroundScript extends BackgroundScript {

	/**
	 * @construct
	 */
	constructor() {
		super();
	}

	/**
	 * @async
	 * @method start : 
	 */
	async start() {
		await super.start();
		
		console.log("custom start background");
	}

	/**
	 * @method onConnect : 
	 * @param {number} tabId : 
	 */
	onConnect(tabId) {
		super.onConnect(tabId);

		// new tab connected

	}

	/**
	 * @method onDisconnect : 
	 * @param {number} tabId : 
	 */
	onDisconnect(tabId) {
		super.onDisconnect(tabId);

		// tab disconnected

	}

	/**
	 * @method onMessage : 
	 * @param {number} from : 
	 * @param {string} type : 
	 * @param {*} data : 
	 * @param {number} tabId : 
	 */
	onMessage(from, type, data, tabId) {
		let result = super.onMessage(from, type, data, tabId);

		// message from content, web or popup
		switch(type) {

			case "test":
				console.log("test message from", name(from));
				break;

		}

		return result;
	}

}

liftoff(ExtensionBackgroundScript);