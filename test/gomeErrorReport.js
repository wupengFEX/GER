/**
 * @author zdongh
 * @fileoverview report tests
 * @date 2017/03/03
 */

import GER from '../src';
const assert = chai.assert;
const expect = chai.expect;
const error_report = new GER({
    url:'xxxx',
    delay: 5000,
    proxyCustom:[]
});
export default () => {
    describe( 'GER', () => {
        describe( 'GER get', () => {
            it( 'should return the Object realy type  is string', () => {
                expect( error_report.get( 'url' ) ).to.be.an( 'string' );
                assert.equal( error_report.get('url'), 'xxxx' );
            } );
            it( 'should return the Object realy type  is number', () => {
                expect( error_report.get( 'delay' ) ).to.be.an( 'number' );
                assert.equal( error_report.get('delay'), 5000 );
            } );
            it( 'should return the Object realy type  is array', () => {
                expect( error_report.get( 'proxyCustom' ) ).to.be.an( 'array' );
            } );
        } );
        describe( 'GER set', () => {
            it( 'should return the Object realy type  is  string', () => {
                expect( error_report.set( 'url', 'yyyyyyy' ) ).to.be.an( 'string' );
                assert.equal( error_report.set('url', 'xxxx'), 'xxxx' );
            } );it( 'should return the Object realy type  is number', () => {
                expect( error_report.set( 'delay', 10000 ) ).to.be.an( 'number' );
                assert.equal( error_report.set('delay', 5000 ), 5000 );
            } );
        } );
        describe( 'GER on', () => {
            it( 'should return the Object realy type  is  array', () => {
                expect( error_report.on( 'test', function(){} ) ).to.be.an( 'array' );
                expect( error_report.on( 'test', function(){} ) ).to.have.length.above( 1 );
                expect( error_report.on( 'test', function(){} ) ).to.have.length.within( 0, 3 );
            } );
        } );
        describe( 'GER off', () => {
            it( 'should return the Object realy type  is  undefined', () => {
                expect( error_report.off( 'test1' ) ).to.be.an( 'undefined' );
            } );
        } );
        describe( 'GER trigger', () => {
            it( 'should return the Object realy type  is  bol', () => {
                assert.equal( error_report.trigger( 'test' ), true );
                assert.equal( error_report.trigger( 'test2' ), false );
            } );
        } );
        describe( 'GER setItem', () => {
            it( 'should return string like {"msg":"1111"}', () => {
                assert.equal( error_report.setItem({msg:'1111'}), '{"msg":"1111"}' );
            } );
            it( 'should return the Object realy type  is  string', () => {
                expect( error_report.setItem( {msg:'1111'}) ).to.be.an( 'string' );
            } );
        } );
        describe( 'GER clear', () => {
            it( 'should return undefined', () => {
                assert.equal( error_report.clear(), undefined );
            } );
        } );

        describe( 'GER info', () => {
            it( 'incoming msg(string) should return an error object', () => {
                expect( error_report.info( 'msgmsg' ) ).to.be.an( 'object' );
                expect( error_report.info( 'msgmsg' ) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg', 'rowNo' );
            } );
            it( 'incoming msgError(object) return an error object', () => {
                let errorObj = {
                    'msg': 'objectMsg',
                    'targetUrl': 'aaa.js',
                    'rowNo': 1,
                    'colNo': 2
                };
                expect( error_report.info( errorObj ) ).to.be.an( 'object' );
                expect( error_report.info( errorObj ) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg', 'rowNo' );
            } );
        } );
        describe( 'GER repeat', () => {
            it( 'should return repeat number equal 2', () => {
                error_report.set('repeat', 2);
                assert.equal( true, error_report.repeat({
                    msg:'msgmsg',
                    level:2
                }) );
            } );
            it( 'should return repeat number not equal 2', () => {
                error_report.repeat({
                    msg:'msgmsg',
                    level:2
                })
                error_report.set('repeat', 2);
                assert.equal( true, error_report.repeat({
                    msg:'msgmsg',
                    level:2
                }) );
            } );
        } );
        describe( 'GER report', () => {
            it( 'should return an string', () => {
                expect( error_report.report() ).to.be.an( 'string' );
            } );
        } );
        describe( 'GER carryError', () => {
            it( 'should return an array', () => {
                expect( error_report.carryError({
                    msg: 'msg'
                }) ).to.be.an( 'array' );
            } );
            it( 'should return an array', () => {
                var len = error_report.errorQueue.length;
                expect( error_report.carryError({
                    msg: 'msg'
                })).to.have.length.above( len );
            } );
        } );
        describe( 'GER handleMsg', () => {
            it( 'should return an object', () => {
                expect( error_report.handleMsg('sss', 'error', 4) ).to.be.an( 'object' );
            } );
            it( 'should return well have any keys', () => {
                expect( error_report.handleMsg('sss', 'error', 4) ).to.have.any.keys( 'userAgent', 'currentUrl', 'msg');
            } );
        } );
    } );
}