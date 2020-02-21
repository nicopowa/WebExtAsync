/**
 * @class BackgroundScript : 
 */
class BackgroundScript {

	/**
	 * @construct
	 */
	constructor() {
		this.port = new BackgroundPort(this.onMessage.bind(this), this.onConnect.bind(this), this.onDisconnect.bind(this));
		this.start();
	}

	/**
	 * @async
	 * @method start : 
	 */
	async start() {
		if(DEBUG) trace("START BACKGROUND SCRIPT");
	}

	/**
	 * @method onConnect : new tab matches extensions rules
	 * @param {number} tabId : 
	 */
	onConnect(tabId) {
		if(DEBUG) trace("new tab :", tabId);
	}

	/**
	 * @method onDisconnect : tab was closed
	 * @param {number} tabId : 
	 */
	onDisconnect(tabId) {
		if(DEBUG) trace("close tab", tabId);
	}

	/**
	 * @method onMessage : 
	 * @param {number} from : const background content web popup
	 * @param {string} type : message type
	 * @param {*} data : message data
	 * @param {number} tabId : emitter tabId if available
	 */
	onMessage(from, type, data, tabId) {
		if(DEBUG) trace(type, "from", name(from), "tab", tabId);
		let result = null;
		switch(type) {

		}
		return result;
	}

	/**
	 * @method activeTab : get active tab info
	 * @return {Promise}
	 */
	activeTab() {
		return new Promise(resolve => which.tabs.query({"active": true, "currentWindow": true}, tabs => resolve(tabs[0])));
	}

	/**
	 * @method updateTab : update tab properties
	 * @param {number} tabId : 
	 * @param {Object} updateInfos : 
	 * @return {Promise}
	 */
	updateTab(tabId, updateInfos) {
		return new Promise(resolve => which.tabs.update(tabId, updateInfos, tab => resolve(tab)));
	}

	/**
	 * @method muteTab : mute
	 * @param {number} tabId : 
	 * @return {Promise}
	 */
	mute(tabId) {
		return this.updateTab(tabId, {"muted": true});
	}
	
	/**
	 * @method unmuteTab : unmute
	 * @param {number} tabId : 
	 * @return {Promise}
	 */
	unmute(tabId) {
		return this.updateTab(tabId, {"muted": false});
	}
	
	/**
	 * @method reload : reload tab
	 * @param {number} tabId : 
	 * @param {boolean} bypassCache : ignore browser cache
	 * @return {Promise}
	 */
	reload(tabId, bypassCache = false) {
		return new Promise(resolve => which.tabs.reload(tabId, {"bypassCache": bypassCache}, () => resolve()));
	}

	/**
	 * @method exec : exec some code in given tab
	 * @param {number} tabId : 
	 * @param {string} code : savage code string
	 * @return {Promise}
	 */
	exec(tabId, code) {
		return new Promise(resolve => which.tabs.executeScript(tabId, {"code": code}, result => resolve(result)));
	}
	
	/**
	 * @method close : close tab
	 * @param {number} tabId : 
	 * @return {Promise}
	 */
	close(tabId) {
		return new Promise(resolve => which.tabs.remove(tabId, result => resolve(result)));
	}
	
	/**
	 * @method download : download something
	 * @param {Object} options : 
	 * @return {Promise}
	 */
	download(options) {
		return new Promise(resolve => which.downloads.download(options, result => resolve(result)));
	}

}