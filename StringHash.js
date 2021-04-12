'use strict';
const Hashable = require('./Hashable.js');

class StringHash extends Hashable{
    #prime = 7;
    #dataString = null;

    constructor(dataString){
        super();
        this.#dataString = dataString;
    }

    hashVal(){
        if(this.#dataString.length === 0){
            return null;
        }

        let hashVal = 0;
        let strLen = this.#dataString.length;
        //iterate through each char in data string 
        for(let i = 0; i < strLen; i++){
            hashVal += this.#dataString.charCodeAt(i)*(this.#prime**(strLen-1-i));
        }

        return hashVal;
    }

    equals(x){
        if(! x instanceof StringHash){
            return false;
        }

        return x.hashVal() === this.hashVal();
    }
}

module.exports = StringHash;