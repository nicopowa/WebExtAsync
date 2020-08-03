/**
 * @class BackgroundScript : base background script
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
	 * @method start : script startup
	 */
	async start() {
		if(DEBUG) console.log("START BACKGROUND SCRIPT");
	}

	/**
	 * @method onConnect : new tab matches extensions rules
	 * @param {number} tabId : 
	 */
	onConnect(tabId) {
		if(DEBUG) console.log("new tab :", tabId);
	}

	/**
	 * @method onDisconnect : tab was closed
	 * @param {number} tabId : 
	 */
	onDisconnect(tabId) {
		if(DEBUG) console.log("close tab", tabId);
	}

	/**
	 * @method onMessage : message received
	 * @param {number} from : const background content web popup
	 * @param {string} type : message type
	 * @param {*} data : message data
	 * @param {number} tabId : emitter tabId if available
	 */
	onMessage(from, type, data, tabId) {
		if(DEBUG) console.log(type, "from", name(from), "tab", tabId);
		let result = null;
		switch(type) {

			default:
				break;

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
	 * @method muteTab : mute tab
	 * @param {number} tabId : 
	 * @return {Promise}
	 */
	mute(tabId) {
		return this.updateTab(tabId, {"muted": true});
	}
	
	/**
	 * @method unmuteTab : unmute tab
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

	/**
	 * @method createWindow : create new window
	 * @param {string} url : window url
	 * @param {number} x : x coordinate
	 * @param {number} y : y coordinate
	 * @param {number} width : window width
	 * @param {number} height : window height
	 */
	createWindow(url, x, y, width, height) {
		return new Promise((resolve, reject) => which.windows.create({
			"url": url,
			"left": x,
			"top": y,
			"width": width,
			"height": height, 
			//"focused": true,
			"incognito": false,
			"type": "popup", // "normal", "popup"
			//"state": state, // "normal", "minimized", "maximized", "fullscreen"
			"setSelfAsOpener": false
		}, window => resolve(window)));
	}
	
	updateWindow(windowId, updates) {
		return new Promise((resolve, reject) => which.windows.update(windowId, updates, window => resolve(window)));
	}

	static get type() {
		return BACKGROUND;
	}

}