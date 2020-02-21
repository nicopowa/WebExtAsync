/**
 * @class ExtensionWebScript : 
 * @extends {WebScript}
 */
class ExtensionWebScript extends WebScript {

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
		
		trace("custom start web");
	}

}

new ExtensionWebScript();