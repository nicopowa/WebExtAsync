class ExtensionBackgroundScript extends BackgroundScript {

	constructor() {
		super();
	}

	onConnect(tabId) {
		super.onConnect(tabId);

		// new tab connected

	}

	onDisconnect(tabId) {
		super.onDisconnect(tabId);

		// tab disconnected

	}

	onMessage(from, type, data, tabId) {
		let result = super.onMessage(from, type, data, tabId);

		// message from content, web or popup
		switch(type) {

			case "test":
				trace("test message from", _name(from));
				break;

		}

		return result;
	}

}

new ExtensionBackgroundScript();