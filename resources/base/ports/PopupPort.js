/**
 * @class PopupPort : 
 * @extends {PortBase}
 */
class PopupPort extends PortBase {

	/**
	 * @construct
	 * @param {Function} onData : 
	 */
	constructor(onData) {
		super(POPUP, onData);

		this.tabs = [];

	}

	/**
	 * @override
	 * @async
	 * @method onPortMessage : message from any port
	 * @param {Object} message : 
	 * @param {Port} port: 
	 * @param {*} result : 
	 */
	async onPortMessage(message, port, result) {

		if(message.type === "info") {

			this.tabs = message.data;
			console.log("tabs", this.tabs);

		}

		await super.onPortMessage(message, port, result);
		
	}

}