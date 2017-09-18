import chai   from 'chai';
import Popup  from '../src/popup';
import helper from '../src/popup-helper';
import 'jsdom-global/register';
const expect = chai.expect;



describe('Validate input type', () => {
    it('Should validate "1" as a number', () => {
        expect( helper.valinput( 1, 'number' ) ).to.equal( true );
    });

    it('Should validate "Hello" as a string', () => {
        expect( helper.valinput( 'Hello', 'string') ).to.equal( true );
    });

    it('Should validate "true" as a boolean', () => {
        expect( helper.valinput( true, 'boolean' )).to.equal( true );
    });

    it('Should validate "false" as a boolean', () => {
        expect( helper.valinput( false, 'boolean' )).to.equal( true );
    });

    it('Should validate "{}" as a object', () => {
        expect( helper.valinput( { }, 'object' )).to.equal( true );
    });

    it('Should validate "[]" as a array', () => {
        expect( helper.valinput( [ ], 'array' )).to.equal( true );
    });

    it('Should validate "null" as a null', () => {
        expect( helper.valinput( null , 'null' )).to.equal( true );
    });

    it('Should validate "undefined" as a undefined', () => {
        expect( helper.valinput( undefined , 'undefined' )).to.equal( true );
    });

    it('Should not validate "1" when expected a string', () => {
        expect( helper.valinput( 1 , 'string' )).to.equal( false );
    });

    it('Should not validate "Hello" when expected a number', () => {
        expect( helper.valinput( "Hello" , 'number' )).to.equal( false );
    });

    it('Should not validate "{ }" when expected a Array', () => {
        expect( helper.valinput( {} , 'Array' )).to.equal( false );
    });

    it('Should not validate "[ ]" when expected a object', () => {
        expect( helper.valinput( [] , 'object' )).to.equal( false );
    });


    it('Should not validate "null" when expected a object', () => {
        expect( helper.valinput( null , 'object' )).to.equal( false );
    });

    it('Should not validate "undefined" when expected a string', () => {
        expect( helper.valinput( null , 'string' )).to.equal( false );
    });
});



describe( 'Validate input using valinCombo', ()=> {
    describe( 'will return the value passed when input and type match', ()=> {
        it('Should return 100', ()=> {
            expect( helper.valinCombo( 100, 'number' )).to.equal( 100 );
        });

        it('Should return -20', ()=> {
            expect( helper.valinCombo( -20, 'number' )).to.equal( -20 );
        });

        it('Should return false', ()=> {
            expect( helper.valinCombo( false, 'boolean' )).to.equal( false );
        });

        it('Should return object', ()=> {
            let obj = { a: "hello", b: "World" }
            expect( helper.valinCombo( obj, 'object' )).to.equal( obj );
        });
    });



    describe( 'will throw an error when input and type unmatch', ()=> {
        it('Should return 100', ()=> {
            expect( ()=>{ helper.valinCombo( 100, 'string' )} ).to.throw( Error, 'Value of "string" was expected. But found "number".');
        });

        it('Should return -20', ()=> {
            expect( ()=>{ helper.valinCombo( 0, 'boolean' )} ).to.throw( Error, 'Value of "boolean" was expected. But found "number".');
        });

        it('Should return false', ()=> {
            expect( ()=>{ helper.valinCombo( false, 'object' )} ).to.throw( Error, 'Value of "object" was expected. But found "boolean".' );
        });

        it('Should return object', ()=> {
            let obj = { a: "hello", b: "World" }
            expect( ()=>{ helper.valinCombo( obj, 'array' )} ).to.throw( Error, 'Value of "array" was expected. But found "object".');
        });
    });
});


describe('Popup object initialization', () => {
    describe('Object will initialize with correct arguments', ()=> {
        it('Expect the Popup to be initialize without argument', () => {
            let popup1 = new Popup();
            expect( typeof( popup1 )).to.equal( 'object' );
        });

        it('Expect the Popup to be initialize with an object as argument', () => {
            let popup2 = new Popup( {} );
            expect( typeof( popup2 )).to.equal( 'object' );
        });

        it('Expect the Popup to he initialize with an object containing values as argument', () => {
            let Obj = { delay: 5000 };
            let popupOBJ = new Popup( Obj );

            expect( popupOBJ.delay ).to.equal( 5000 );
            expect( popupOBJ.elem ).to.equal( 'entrepids-popup' );
        });
    });


    describe('Object will throw error if initialize with bad arguments', ()=> {
        it('Expect the Popup to throw an error if argument is null', () => {
            expect( ()=>{ popup3 = new Popup(null)}  ).to.throw( Error, 'Value of "object" was expected. But found "null".');
        });

        it('Expect the Popup to throw an error if argument is string', () => {
            expect( ()=>{ popup4 = new Popup("Hello")}  ).to.throw( Error, 'Value of "object" was expected. But found "string".');
        });

        it('Expect the Popup to throw an error if argument is number', () => {
            expect( ()=>{ popup4 = new Popup(100)}  ).to.throw( Error, 'Value of "object" was expected. But found "number".');
        });

        it('Expect the Popup to throw an error if argument is boolean true', () => {
            expect( ()=>{ popup4 = new Popup(true)}  ).to.throw( Error, 'Value of "object" was expected. But found "boolean".');
        });

        it('Expect the Popup to throw an error if argument is boolean false', () => {
            expect( ()=>{ popup4 = new Popup(false)}  ).to.throw( Error, 'Value of "object" was expected. But found "boolean".');
        });

        it('Expect the Popup to throw an error if argument is Array', () => {
            expect( ()=>{ popup4 = new Popup( [] )}  ).to.throw( Error, 'Value of "object" was expected. But found "array".');
        });
    });

})




describe('Popup methods test', () => {

    let locaStorage = {};

    // Mover a  otro describe
    xit('Expect the lastTimePopupShowInterval() return number of hours between two dates,', () => {
    });

    describe( 'show and hide methods', () =>{
        let popupDiv = document.createElement('div');

        it('Expect the showPopup() to display the popup on the browser', () => {
            popupDiv.setAttribute( "id",      "entrepids-popup" );
            popupDiv.setAttribute( "data",    "role: popup-main" );
            popupDiv.setAttribute( "display", "none" );

            document.body.appendChild( popupDiv );
            let popupWindow = new Popup({ elem: "entrepids-popup" } );
            popupWindow.showPopup(false);

            expect( popupDiv.style.display ).to.equal( 'initial' );
        });

        it('Expect the hidePopup() to hide the popup on the browser', () => {
            popupDiv.setAttribute( "id",      "entrepids-popup1" );
            popupDiv.setAttribute( "data",    "role: popup-main" );
            popupDiv.setAttribute( "display", "initial" );

            document.body.appendChild( popupDiv );
            let popupWindow = new Popup({ elem: "entrepids-popup1" } );
            popupWindow.hidePopup(false);

            expect( popupDiv.style.display ).to.equal( 'none' );
        });


        it('Expect the showPopup() to display the popup on the browser with delay', (done) => {
            popupDiv.setAttribute( "id",      "entrepids-popup2" );
            popupDiv.setAttribute( "data",    "role: popup-main" );
            popupDiv.setAttribute( "display", "none" );

            document.body.appendChild( popupDiv );
            let popupWindow = new Popup({ elem: "entrepids-popup2" , delay:500} );
            popupWindow.showPopup();
            done();

            expect( popupDiv.style.display ).to.equal( 'initial' );
        });

        it('Expect the hidePopup() to hide the popup on the browser with delay', (done) => {
            popupDiv.setAttribute( "id",      "entrepids-popup3" );
            popupDiv.setAttribute( "data",    "role: popup-main" );
            popupDiv.setAttribute( "display", "initial" );

            document.body.appendChild( popupDiv );
            let popupWindow = new Popup({ elem: "entrepids-popup3", delay:500 } );
            popupWindow.hidePopup( true );
            done();

            expect( popupDiv.style.display ).to.equal( 'none' );
        });
    });

});
