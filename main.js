const HuffEncoder = require('./HuffEncoder');

if(process.argv.length != 3){
    throw new Error('Provide the path to the encoding plain text file !');
}

let huffEncoder = new HuffEncoder(process.argv[2]);

huffEncoder.encode();