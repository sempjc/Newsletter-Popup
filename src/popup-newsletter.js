import Popup from './popup';

const _private = new WeakMap();

let  _NewsletterPopup = {
    delay: 180000,
    elem: 'entrepids-newsletter',
    lasTimeViewed: '',
    waitInterval: 6,
    isSubscribed: false,
    initCount: new Date().getTime()
}





class NewsletterPopup extends Popup {
    constructor( conf, storage ) {

        // Call to the parent class
        super();

        // Set Weak Map for private properties
        _private.set(this, _NewsletterPopup);
        let _this =  _private.get(this);

        testConsole();
        _this.delay = 500;
        testConsole();




    }





}









var _populateStorage = ( conf, storage ) => {
    storage.setItem( 'delay', conf.delay );
    storage.setItme( 'elem',  conf.elem );
    storage.setItem( 'lastTimeShow',  conf.lastTimeShow );
    storage.setItem( 'waitInterval',  conf.waitInterval );
    storage.setItem( 'isSubscribed',  conf.isSubscribed );
    storage.setItem( 'initCount', conf.initCount);
};






export default NewsletterPopup;
