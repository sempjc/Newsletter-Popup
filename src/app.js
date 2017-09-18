import Popup from './popup';
import nw from './popup-newsletter'

console.log('testing');
let test = new nw();

const LS = window.localStorage;

// Configuration Option for the application
let configuration = {
    delay: 180000,
    elem : 'entrepids-newsletter',
    lastTimeShow: '',
    waitInterval: 6,
    isSubscribed: false,
    initTime:     new Date().getTime(),
};





// Store data on localStorage
let populateStorage = ( config ) => {
    LS.setItem( 'delay', config.delay );
    LS.setItem( 'elem',  config.elem  );
    LS.setItem( 'lastTimeShow',  config.lastTimeShow );
    LS.setItem( 'waitInterval',  config.waitInterval );
    LS.setItem( 'isSubscribed',  config.isSubscribed );
    LS.setItem( 'initTime',      config.initTime     );
};





// Return an object with data rerieved from localStorage
let getConfig = () => {
    return {
        waitInterval : JSON.parse( LS.getItem( 'waitInterval' )),
        isSubscribed : JSON.parse( LS.getItem( 'isSubscribed' )),
        lastTimeShow : LS.getItem( 'lastTimeShow' ),
        initTime     : JSON.parse( LS.getItem( 'initTime'     )),
    };
};

let getPopupConfig = () => {
    return {
        elem  : LS.getItem( 'elem'  ),
        delay : JSON.parse( LS.getItem( 'delay' ) ),
    };
};





// Return an estimated time in hours between the last time the popup was showed and current time
let getInterval = ( current, last ) => {
    if( last == 0 ) {
        return Math.abs(( current - new Date() ) / 36e5 );
    } else {
        return Math.abs( (current - new Date(last)) / 36e5 );
    }
};





// Update lastTimeShow date
let resetNewsletterPopup = () => {
    console.log( 'lastShow ' + LS.getItem( 'lastTimeShow' ));
    LS.setItem( 'lastTimeShow', new Date() );
    LS.setItem( 'initTime',    0 );
    LS.setItem( 'delay', configuration.delay );
};





// Calculate  and return in milisecond the time remaining for the delay when user navigate between pages
let setDelay = ( initTime, currentTime, delay ) => {
    let interval = currentTime - initTime;
    let remain = delay - interval;
    if(remain <= 0 ) { remain = 0; }
    return remain;
};





// Main Newsletter Popup function
let initNewsletterPopup = ( conf ) => {
    if( LS.length === 0 ) {
        populateStorage( conf );
    }

    let d = getConfig();

    // If not Subscribed run Newsletter Popup app
    if( !d.isSubscribed ) {
        let initTime    = ( d.initTime == 0 )? new Date().getTime() : d.initTime;
        LS.setItem( 'initTime', initTime );

        let currentTime = new Date().getTime();
        let popupConfig = getPopupConfig();
        let delay = setDelay( initTime, currentTime, popupConfig.delay);
        let NewsletterPopup = new Popup({
            elem: popupConfig.elem,
            delay: delay
        });

        // If popup never show before show popup
        // If already showed and time lapse is greater than 6 hr show popup
        let interval = getInterval( new Date(), d.lastTimeShow );

        console.log( 'interval ' + interval );

        if( interval === 0 || d.waitInterval <= interval ) {
            setTimeout( function() {
                NewsletterPopup.showPopup(false);
                resetNewsletterPopup();
            }, delay );
        }

    } else {
        // If Subscribed delete storaged data
        LS.clear();
    }
};


initNewsletterPopup( configuration );
