'use strict';

class HuffTree{
    #root = null;
    #weight = null;

    constructor(weight, char, root){

        if(weight && char && !root){
            this.#root = new Node(null, null, char);
            this.#weight = weight;

        }else if(weight && !char && root){
            this.#root = root;
            this.#weight = weight;

        }

    }

    combine(huffTree){
        let combinedRoot = new Node(this.root, huffTree.root, null);

        return new HuffTree(this.weight + huffTree.weight, null, combinedRoot);
    }

    compareTo(huffTree){

        if(this.weight === huffTree.weight){
            let thisInorderChars = [], targetInorderChars = [];

            for(let char of this.inorderTraversal()){
                thisInorderChars.push(char);
            }
            for(let char of huffTree.inorderTraversal()){
                targetInorderChars.push(char);
            }

            let thisSmallestCharCode = Math.min(...thisInorderChars.map( char => char.charCodeAt(0)));
            let targetSmallestCharCode = Math.min(...targetInorderChars.map( char => char.charCodeAt(0)));
            
            if(thisSmallestCharCode < targetSmallestCharCode){
                return -1;
            }

            if(thisSmallestCharCode > targetSmallestCharCode){
                return 1;
            }

            if(thisSmallestCharCode == targetSmallestCharCode){
                return 0;
            }
        }
        
        if(this.weight < huffTree.weight){
            return -1;
        }

        if(this.weight > huffTree.weight){
            return 1;
        }

        return undefined;
    }

    get weight(){
        return this.#weight;
    }

    set weight(newWeight){
        this.#weight = newWeight;
    }

    get root(){
        return this.#root;
    }

    *inorderTraversal(root = this.#root){
        if(!root){
            return;
        }

        yield *this.inorderTraversal(root.left);
        if(root.data){
            yield root.data;
        }
        yield *this.inorderTraversal(root.right);
    }    

    getPathToLeaves(root = this.#root, paths = ''){
        if(!root){
            return;
        }

        this.getPathToLeaves(root.left, paths);
        //TODO
    }

}

class Node{
    #left = null;
    #right = null;
    #data = null;

    constructor(left, right, data){
        this.#left = left;
        this.#right = right;
        this.#data = data;
    }

    get left(){
        return this.#left;
    }

    set left(left){
        this.#left = left;
    }

    get right(){
        return this.#right;
    }

    set right(right){
        this.#right = right;
    }

    get data(){
        return this.#data;
    }

    set data(data){
        this.#data = data;
    }
}


module.exports = HuffTree;