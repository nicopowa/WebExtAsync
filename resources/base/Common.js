const DEBUG = true;

const BACKGROUND = 0;
const CONTENT = 1;
const POPUP = 2;
const WEB = 3;

const which = (typeof chrome === "undefined") ? (typeof browser === "undefined") ? null : browser : chrome; // chrome || browser || null
const where = (which && which.extension && which.extension.getBackgroundPage ? (which.extension.getBackgroundPage() === window ? BACKGROUND : POPUP) : (!which || !which.runtime || !which.runtime.onMessage ? WEB : CONTENT));

const trace = (...args) => console.log(...args);
const name = c => ["background", "content", "popup", "web"][c];

/* ARRAY PROTOTYPE ASYNC MAP */
Object.defineProperty(Array.prototype, "mapAsync", {
    value: async function(callback) {
		return this.reduce((promise, cur, index, arr) => promise.then(async acc => Promise.resolve([...acc, await callback(cur, index, arr)])), Promise.resolve([]));
	}
});

/* ARRAY PROTOTYPE ASYNC FOREACH */
Object.defineProperty(Array.prototype, "forEachAsync", {
    value: async function(callback) {
		for(let index = 0, cur = this[index]; index < this.length && await callback(cur, index, this) !== false; cur = this[++index]) {};
	}
});

/* ARRAY PROTOTYPE ASYNC REDUCE */
Object.defineProperty(Array.prototype, "reduceAsync", {
    value: async function(callback, start) {
		return this.reduce((promise, cur, index, arr) => promise.then(acc => Promise.resolve(callback(acc, cur, index, arr))), Promise.resolve(start));
	}
});