'use strict';
let assert = require('assert');
const Dictionary = require('./Dictionary');
const StringHash = require('./StringHash');
const IntHash = require('./IntHash');

testMain();

function testMain(){
    emptyDictTest();
    oneItemDictTest();
    addItemDictTest();
    updateValueDictTest();
    notContainedKeyDictTest();

    console.log('All the tests passed !');
}

function emptyDictTest(){
    let emptyDict = new Dictionary(10);

    assert(emptyDict.isEmpty());
}

function oneItemDictTest(){
    let oneItemDict = new Dictionary(10);
    let key = new StringHash('onlyKey');
    let val = 'val of the only key';
    oneItemDict.put(key, val);
    assert(!oneItemDict.isEmpty());
    assert(oneItemDict.contains(key));
}

function addItemDictTest(){
    let dict = new Dictionary(10);
    let key1 = new StringHash('key1');
    let val1 = "value of key1";
    let key2 = new IntHash(2);
    let val2 = "value of key2";
    
    dict.put(key1, val1);
    dict.put(key2, val2);

    assert(dict.get(key1) === val1 && dict.get(key2) === val2);
}

function updateValueDictTest(){
    let dict = new Dictionary(10);
    let key = new StringHash('key');
    let oldVal = "old value";
    let newVal = 'new value';

    dict.put(key, oldVal);
    dict.put(key, newVal);

    assert(dict.get(key) === newVal);
}

function notContainedKeyDictTest(){
    let dict = new Dictionary(10);
    let key = new StringHash('key');
    let unRegisteredKey = new StringHash('key2');

    dict.put(key, 'val');
    
    assert(dict.contains(unRegisteredKey) === false);
    assert(dict.get(unRegisteredKey) === undefined);
}

