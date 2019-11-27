class ExtensionContentScript extends ContentScript {

	constructor() {
		super();
	}

	async start() {
		await super.start();

		trace("START CONTENT");
		// ready !
		// start here

	}

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