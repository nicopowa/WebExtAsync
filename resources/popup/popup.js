class ExtensionPopupScript extends PopupScript {

	constructor() {
		super();
	}

	async start() {
		await super.start();

		trace("START POPUP");
		
		setTimeout(() => {
			this.port.send(CONTENT, "test", {hello: "world"}, this.port.tabs[0]);
			this.port.send(BACKGROUND, "test", {hello: "world"});
		}, 1000);

	}

	onMessage(from, type, data, tabId) {
		let result = super.onMessage(from, type, data, tabId);

		// message from background, content or web

		return result;
	}

}

new ExtensionPopupScript();