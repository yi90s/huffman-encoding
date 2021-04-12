class Hashable{

    constructor(){
        if(this.constructor === Hashable){
            throw new TypeError("Cannot create an instance of an Hashable abstract class");
        }
    }

    hashVal(){
        throw new Error("This is an abstract method !");
    }

    equals(x){
        throw new Error("This is an abstract method !");
    }
}

module.exports = Hashable;