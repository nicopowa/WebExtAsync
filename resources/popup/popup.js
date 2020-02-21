/**
 * @class ExtensionPopupScript
 * @extends {PopupScript}
 */
class ExtensionPopupScript extends PopupScript {

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

		trace("custom start popup");
		
		setTimeout(() => {
			this.port.send(CONTENT, "test", {hello: "world"}, this.port.tabs[0]);
			this.port.send(BACKGROUND, "test", {hello: "world"});
		}, 1000);

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

		// message from background, content or web

		return result;
	}

}

new ExtensionPopupScript();