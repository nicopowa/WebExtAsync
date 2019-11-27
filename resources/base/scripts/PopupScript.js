class PopupScript {

	constructor() {
		this.port = new PopupPort(this.onMessage.bind(this));
	}

	async start() {

	}

	async onMessage(from, type, data, tabId) {
		trace(type, "from", _name(from), "tab", tabId);
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