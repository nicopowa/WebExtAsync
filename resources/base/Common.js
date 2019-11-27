const DEBUG = false;
const BACKGROUND = 0;
const CONTENT = 1;
const POPUP = 2;
const WEB = 3;
const which = (typeof chrome === "undefined") ? (typeof browser === "undefined") ? null : browser : chrome;
const where = (which && which.extension && which.extension.getBackgroundPage ? (which.extension.getBackgroundPage() === window ? BACKGROUND : POPUP) : (!which || !which.runtime || !which.runtime.onMessage ? WEB : CONTENT));
const trace = (...args) => console.log(...args);
const _name = c => ["background", "content", "popup", "web"][c];