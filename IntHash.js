'use strict';
const Hashable = require('./Hashable');

class IntHash extends Hashable{
    #integer = null;

    constructor(integer){
        super();
        this.#integer = integer;
    }

    hashVal(){
        return this.#integer;
    }

    equals(x){
        if( !x instanceof IntHash){
            return false;
        }

        return x.hashVal() === this.hashVal();
    }
}

module.exports = IntHash;