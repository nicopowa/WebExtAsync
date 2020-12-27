var DEBUG = true;

const BACKGROUND = 0;
const CONTENT = 1;
const POPUP = 2;
const WEB = 3;

/**
 * 
 */
const which = (typeof chrome === "undefined") ? (typeof browser === "undefined") ? null : browser : chrome;

/**
 * 
 */
const where = (which && which.extension && which.extension.getBackgroundPage ? (which.extension.getBackgroundPage() === window ? BACKGROUND : POPUP) : (!which || !which.runtime || !which.runtime.onMessage ? WEB : CONTENT));

/**
 * 
 */
const lang = (navigator.language || navigator.userLanguage).slice(0, 2);

/**
 * 
 * @param {number} c 
 */
const name = c => ["background", "content", "popup", "web"][c];

/**
 * @method liftoff : script entry point
 * @param {Class} classRef : script class
 */
const liftoff = classRef => where === classRef.type && new classRef();