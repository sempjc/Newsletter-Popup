import Helper from './popup-helper';

/** Class representing a Popup window */
class Popup {


    /**
     * @param { object } [popup = {}] - Object with options.
     * @param { string } popup.elem - Name of the HTML Id ( without '#' ) of the Popup Window main tag.
     * @param { number } popup.delay - Amount of time to delay Popup window from appear or disappear.
     * @description Create a new Popup window.
     */
    constructor( popup = {} ) {
        if( Helper.valinput( popup, 'object' ) || Helper.valinput( popup, 'undefined' ) ){
            this.elem  = popup.elem  === undefined ? 'entrepids-popup' : Helper.valinCombo( popup.elem,  'string' );
            this.delay = popup.delay === undefined ? 0                 : Helper.valinCombo( popup.delay, 'number' );
        } else {
            Helper.logError( popup, "object" );
        }
    }





    /**
     * Display Popup Window on browser
     * @param {boolean} [isDelay = true] - Set true if you want to use the delay feature or false to disable.
     * By default is set true.
     */
    showPopup( isDelay = true ) {
        switch(isDelay) {
            case true :
                window.setTimeout(() => {
                    document.getElementById(this.elem).style.display = 'initial';
                }, this.delay );
                break;

            default:
                document.getElementById(this.elem).style.display = 'initial';
        }
    }





    /**
     * Hide Popup Window on browser
     * @param {boolean} [isDelay = false] - Set true if you want to use the delay feature or false to disable.
     * By default is set false.
     */
    hidePopup(isDelay = false ) {
        switch(isDelay) {
            case true :
                window.setTimeout(() => {
                    document.getElementById(this.elem).style.display = 'none';
                }, this.delay );
                break;

            default:
                document.getElementById(this.elem).style.display = 'none';
        }
    }
}





export default Popup;
