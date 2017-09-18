
/** Class helper for the Popup Class */
class PopupHelper {

    /**
     * @description Evaluate if value provided are the same type as specified by the type param.
     *
     * @param  { * } val - The value to be evaluate.
     * @param { string } type - Name of the data type expected.
     *
     * @return {boolean} True if validation pass and false when fail.
     */
    static valinput ( val, type ) {
        if( typeof(val) === 'object' ) {

            switch( true ) {

                case Array.isArray( val ):
                    return type === 'array';

                case val === null:
                    return type === 'null';

                default:
                    return type === 'object';
            }

        } else {
            return typeof(val) === type;
        }
    }





    /**
     * @description Log error message with details of the failure.
     *
     * @param  { * } val - The value found..
     * @param { string } type - Name of the data type expected.
     */
    static logError ( val, type ) {
        let typeVal = typeof(val);

        if( typeVal === 'object' ) {
            switch( true ) {

                case Array.isArray( val ):
                    typeVal = 'array';
                    break;

                case val === null:
                    typeVal = 'null';
                    break;

                default:
                    typeVal = 'object';
            }
        }


        let msg = 'Value of "' + type + '" was expected. ' + 'But found "' + typeVal +'".\n';
        this.errormsg( msg );
    }



/**
 * @description A combo method that combine valinput(val, type) and logError(val, type) into one function.
 * If the validation pass return the value, but when fail throw an error message.
 *
 * @param {*} val  - The value to be evaluate
 * @param {string} - Name of the data type expected.
 *
 * @return {*} When evaluation pass return the value of val, on fail error will be throw and nothing be returned.
 *
 */
    static valinCombo (val , type) {
        if( this.valinput( val, type ) ) {
            return val;
        } else {
            this.logError(val, type);
        }

    }




/**
 * @description Throw error message.
 *
 * @param { string } msg - The message to be throw.
 *
 */
    static errormsg( msg ) {
        throw new Error( msg );
    }
}

export default PopupHelper;
