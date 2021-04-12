'use strict';
const Hashable = require("./Hashable");

class Dictionary{
    #arr = null;

    constructor(size){
        this.#arr = new Array(size);
    }

    put(key, value){
        if(! key instanceof Hashable){
            throw new Error("Invalid type for key parameter");
        }

        let idx = this.#getIndexOfKey(key);
        let newNode = new Node(null, key, value);

        if(this.#arr[idx] === undefined){ //if position is empty, insert the pair
            this.#arr[idx] = newNode;

        }else{

            //iterate through the chaining list and looks for a pair with the same key
            let hasDup = false;
            let curNode = this.#arr[idx];
            let tailNode = curNode;

            while(curNode != null){
                if(curNode.key.equals(newNode.key)){
                    curNode.value = newNode.value;
                    hasDup = true;
                }
                if(curNode.next === null){
                    tailNode = curNode;
                }
                curNode = curNode.next;
            }

            if(!hasDup){
                tailNode.next = newNode;
            }
        }
    }

    get(key){
        if(! key instanceof Hashable){
            throw new Error("Invalid type for key parameter");
        }

        let node = this.#arr[this.#getIndexOfKey(key)];

        if(node === undefined){
            return undefined;
        }

        let val = undefined;

        while(node != null){            
            if(node.key.equals(key)){
                val = node.value;
            }
            node = node.next;   
        }

        return val;
    }

    contains(key){
        if(! key instanceof Hashable){
            throw new Error("Invalid type for key parameter");
        }

        let node = this.#arr[this.#getIndexOfKey(key)];

        if(node === undefined){
            return false;
        }

        let hasKey = false;

        while(node != null){            
            if(node.key.equals(key)){
                hasKey = true;
                break;
            }
            node = node.next;   
        }

        return hasKey;
    }

    isEmpty(){
        let isEmpty = true;

        for(let node of this.#arr){
            if(node != undefined){
                isEmpty = false;
                break;
            }
        }

        return isEmpty;
    }

    toString(){
        let out = '[';
        for(let node of this.#arr){
            let nodeStr = '(';

            if( node !== undefined){
                let curNode = node;

                while(curNode != null){
                    nodeStr += '<' + curNode.key.hashVal() + ', ' + curNode.value + '>';

                    curNode = curNode.next;
                }
            }
            
            nodeStr += ')';
            out += nodeStr;
        }
        return out + ']';
    }

    // private methods
    #getIndexOfKey(key){
        return key.hashVal() % this.#arr.length;
    }
}

class Node{
    #next = null;
    #key = 0;
    #value = 0;

    constructor(next, key, value){
        this.#next = next;
        this.#key = key;
        this.#value = value;
    }
    get next(){
        return this.#next;
    }

    set next(next){
        this.#next = next; 
    }

    get key(){
        return this.#key;
    }

    get value(){
        return this.#value;
    }

    set value(value){
        this.#value = value;
    }
}

module.exports = Dictionary;