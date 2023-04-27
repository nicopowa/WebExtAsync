/**
 * @class WebScript : base web script
 */
class WebScript {

	/**
	 * @construct
	 */
	constructor() {
		
	}

	/**
	 * @async
	 * @method start : script startup
	 */
	async start() {

		if(DEBUG) 
			console.log("START WEB SCRIPT");

	}

	static get type() {

		return WEB;
		
	}

}