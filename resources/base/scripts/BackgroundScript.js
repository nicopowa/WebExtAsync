class BackgroundScript {

	constructor() {
		trace("start background script");
		this.port = new BackgroundPort(this.onMessage.bind(this), this.onConnect.bind(this), this.onDisconnect.bind(this));
	}

	/**
	 * @method onConnect : new tab matches extensions rules
	 * @param {number} tabId 
	 */
	onConnect(tabId) {
		trace("new tab :", tabId);
	}

	/**
	 * @method onDisconnect : tab was closed
	 * @param {number} tabId 
	 */
	onDisconnect(tabId) {
		trace("close tab", tabId);
	}

	/**
	 * 
	 * @param {number} from : const background content web popup
	 * @param {string} type : message type
	 * @param {*} data : message data
	 * @param {number} tabId : emitter tabId if available
	 */
	onMessage(from, type, data, tabId) {
		trace(type, "from", _name(from), "tab", tabId);
		let result = null;
		switch(type) {

		}
		return result;
	}

	/**
	 * @method activeTab : get active tab info
	 */
	activeTab() {
		return new Promise(resolve => which.tabs.query({"active": true, "currentWindow": true}, tabs => resolve(tabs[0])));
	}

	/**
	 * @method updateTab : update tab properties
	 * @param {number} tabId 
	 * @param {Object} updateInfos 
	 */
	updateTab(tabId, updateInfos) {
		return new Promise(resolve => which.tabs.update(tabId, updateInfos, tab => resolve(tab)));
	}

	/**
	 * @method muteTab : mute
	 * @param {number} tabId : 
	 */
	mute(tabId) {
		return this.updateTab(tabId, {"muted": true});
	}
	
	/**
	 * @method unmuteTab : mute
	 * @param {number} tabId : 
	 */
	unmute(tabId) {
		return this.updateTab(tabId, {"muted": false});
	}
	
	/**
	 * @method reload : reload tab
	 * @param {number} tabId : 
	 * @param {boolean} bypassCache : ignore browser cache
	 */
	reload(tabId, bypassCache = false) {
		return new Promise(resolve => which.tabs.reload(tabId, {"bypassCache": bypassCache}, () => resolve()));
	}

	/**
	 * @method exec : exec some code in given tab
	 * @param {number} tabId : 
	 * @param {string} code : savage code string
	 */
	exec(tabId, code) {
		return new Promise(resolve => which.tabs.executeScript(tabId, {"code": code}, result => resolve(result)));
	}
	
	/**
	 * @method close : close tab
	 * @param {number} tabId 
	 */
	close(tabId) {
		return new Promise(resolve => which.tabs.remove(tabId, result => resolve(result)));
	}
	
	/**
	 * @method download : download something
	 * @param {Object} options : 
	 */
	download(options) {
		return new Promise(resolve => which.downloads.download(options, result => resolve(result)));
	}

}