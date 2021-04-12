'use strict';
const HuffTree = require('./HuffTree');
const Dictionary = require('./Dictionary');
let fs = require('fs');
const StringHash = require('./StringHash');

class HuffEncoder{
    #charWeights = null;
    #charSet = null;

    constructor(inputFileName){
        let encodingText = fs.readFileSync(inputFileName, 'utf8');
        this.#charWeights = new Dictionary(encodingText.length);
        this.#charSet = new Set();

        for(let char of encodingText){ //iterate the input string and count each char
            this.#charSet.add(char);
            let charAsKey = new StringHash(char);

            if(!this.#charWeights.contains(charAsKey)){  //initialize the count for char to 1
                this.#charWeights.put(charAsKey, 1); 
                
            }else{ // +1 to the count of char
                let charCount = this.#charWeights.get(charAsKey);

                this.#charWeights.put(charAsKey, charCount+1);
            }
        }
        
        let frequencies = this.#charWeights;
        this.#charSet.forEach(function(char){
            let key = new StringHash(char);
            let timesOccured = frequencies.get(key);
            let weight = timesOccured/encodingText.length;

            frequencies.put(key, weight);
        })
    }

    encode(){

        /**
         * push single-node huff tree onto a sorted list by their weight
         */
        let weightOrderedHuffTrees = [];

        for(let char of this.#charSet){
            let weight = this.#charWeights.get(new StringHash(char));
            let hufTree = new HuffTree(weight, char);

            weightOrderedHuffTrees.push(hufTree);
        }

        weightOrderedHuffTrees.sort((treeA, treeB) => treeA.compareTo(treeB));

        while(weightOrderedHuffTrees.length > 1){
            let lightestTree = weightOrderedHuffTrees.shift();
            let secondLightestTree = weightOrderedHuffTrees.shift();
            let mergedTree = lightestTree.combine(secondLightestTree);

            weightOrderedHuffTrees.push(mergedTree);
            weightOrderedHuffTrees.sort((treeA, treeB) => treeA.compareTo(treeB));
        }

        let completeTree = weightOrderedHuffTrees[0];

        let paths = completeTree.getPathToLeaves();

        //TODO: build and output the compressed text by paths
    }

}

module.exports = HuffEncoder;