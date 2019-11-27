# WebExtAsync

WebExtension template with async messaging between background, content, web and popup scripts


## WebExtensions

#### Structure :
- Background script : allows the extension to access browser native features, such as tabs, debugger, ... 
- Content script : injected in web pages that match the manifest rules. It is able to interact with the DOM.
- Web script : code can be injected in target web page JS context. (TODO)
- Popup script : a web page that runs in the browser's top right menu, contains extension settings.

## Set-up

- clone this repository
- open Chrome
- navigate to chrome://extensions/
- enable developer mode
- load unpacked extension

## How-to

Main files :
- resources/background.js
- resources/content.js
- resources/popup/popup.js
- resources/web.js (not loaded yet)

## Messages

Different parts can send messages to each other with two APIs :
- ports : https://developer.chrome.com/extensions/runtime#type-Port
- messages : https://developer.chrome.com/extensions/runtime#method-sendMessage

messages API is ugly and limited, this extension only uses Ports.

### Sending messages

To send messages between parts of the extension, call the "wait" method from script classes :

	await this.port.wait(target:uint, type:string, data:Object, tabId:uint)
- target : target script const : BACKGROUND, CONTENT, WEB, POPUP
- type : message type : any string
- data : anything
- tabId:  tab ID (only for CONTENT and WEB), defaults to -1

All messages are piped through background script and relayed to target script.

#### Example
from background script :

	// send data to tab ID 7 and await result
	let result = await this.port.wait(CONTENT, "mychannel", {some: "data"}, 7);

to content script :
	
	onMessage(from, type, data, tabId) {
		let result = super.onMessage(from, type, data, tabId);
		if(from === BACKGROUND && type === "mychannel") {
			result = {answer: "i got that"};
		}
		return result;
	}

		
	


