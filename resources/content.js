/**
 * @class ExtensionContentScript : 
 * @extends {ContentScript}
 */
class ExtensionContentScript extends ContentScript {

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

		trace("custom start content");
		// ready !
		// start here

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

		// message from background, web or popup
		switch(type) {

			case "test":
				trace("test from", _name(from));
				break;

		}

		return result;
	}

}

new ExtensionContentScript();