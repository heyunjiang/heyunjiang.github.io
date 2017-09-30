/* getOS */
function getOs(){
	var agent = navigator.userAgent.toLowerCase(),opera = window.opera;
	var browser = {
		ie:/(msie\s|trident.*rv:)([\w.]+)/.test(agent),
		opera:( !!opera && opera.version ),
		webkit:( agent.indexOf( ' applewebkit/' ) > -1 ),
		mac:( agent.indexOf( 'macintosh' ) > -1 ),
		quirks:( document.compatMode == 'BackCompat' )
	}
	return browser;
}
/*bindEvent*/
function bindEvent(type, func){
	if(this.addEventListener){
		this.addEventListener(type, func);
	}else if(this.attachEvent){
		this.attachEvent('on'+type, func);
	}
}
/*get event*/
var e = window.event||e;
/*get target*/
var ele = e.srcElement ? e.srcElement:e.target;
