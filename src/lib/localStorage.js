/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */
import Peep from "./peep";
import utils from "./utils";

let hasLocal = !!window.localStorage;

function InertLocalFunc( funcA, funcB ) {
    return hasLocal ? funcA : funcB;
}

function callByArgs( func, args, global ) {
    return func.apply( global, utils.toArray( args ) );
}

let storage = {
    //设置cookie内json的key名
    getKey: function ( errorObj ) {
        let isValid = function ( name ) {
            return errorObj[ name ];
        };
        return [ 'msg', 'colNum', 'rowNum' ].filter( isValid ).map( isValid ).join( '@' );
    },
    //检查是否有效
    deleteExpiresItem: function ( data ) {
        let oData = data === '' ? {} : utils.parse( data );
        let date = +new Date();
        for ( let key in oData ) {
            if ( utils.parse( oData[ key ] ).expiresTime <= date ) {
                delete oData[ key ];
            }
        }
        return oData;
    },
    //设置失效时间
    getEpires: function ( validTime ) {
        return +new Date() + ( 1000 * 60 * 60 * 24 * validTime );
    },
    limitError: function ( source, number ) {
        let keys = Object.keys( source );
        if ( keys.length >= number ) {
            delete source[ keys[ 0 ] ];
        }
        return source;
    },
    //获取cookie/localStorage内容体
    setInfo: function ( key, errorObj, validTime, number ) {
        let source = storage.getItem( key );
        if ( errorObj ) {
            let errorItem = {
                expiresTime: storage.getEpires( validTime ),
                value: errorObj.msg,
            };
            let key = storage.getKey( errorObj );
            source = this.limitError( source, number );
            source[ key ] = utils.stringify( errorItem );
        }
        return utils.stringify( source );
    },
    //设置cookie/localStorage
    setItem: InertLocalFunc( ( key ) => {
        localStorage.setItem( key, callByArgs( storage.setInfo, arguments, storage ) );
    }, ( key ) => {
        utils.addCookie( key, callByArgs( storage.setInfo, arguments, storage ) );
    } ),
    //获取cookie/localStorage
    getItem: InertLocalFunc( ( key ) => {
        return storage.deleteExpiresItem( localStorage.getItem( key ) || '' );
    }, ( key ) => {
        return storage.deleteExpiresItem( utils.getCookie( key ) );
    } ),
    //清除cookie/localStorage
    clear: InertLocalFunc( ( key ) => {
        return key ? localStorage.removeItem( key ) : localStorage.clear();
    }, ( key ) => {
        return key ? utils.clearCookie( key ) : document.cookie.split( '; ' ).forEach( utils.clearCookie );
    } )
};




class Localstroage extends Peep {
    constructor( options ) {
        super( options );
        this.setItem();
    }

    //得到元素值 获取元素值 若不存在则返回''
    getItem( key ) {
        return storage.getItem( key );
    }
    // 设置一条localstorage或cookie
    setItem( errorObj ) {
        let _config = this.config;
        storage.setItem( this.config.errorLSSign, errorObj, _config.validTime, _config.maxErrorCookieNo );
    }

    //清除ls/cookie 不传参数全部清空  传参之清当前ls/cookie
    clear( key ) {
        storage.clear( key );
    }
}

export default Localstroage;