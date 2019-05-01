const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const romanRouter = express.Router();

const romanNumerals = new Map(
    [
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000]
    ]
);

//Get a list of Roman Numerals
romanRouter.route('/roman')
    .get((req, res) => {

        const response = { Error: 'NO VALUE ENTERED, You must enter a vallid Number' }

        res.json(response);

    });

//Take a number and return a Roman Numeral String
romanRouter.route('/roman/:number')
    .get((req, res) => {

        let response = {};
        let isAVallidRomanNumeral = true;
        let romanNumeralStr = '';
        let RNArray = Array.from(romanNumerals);

        console.log(RNArray);

        if (isNaN(req.params.number)) {
            isAVallidRomanNumeral = false
        } else {

            let workingNumbe = 0;
            workingNumber = parseInt(req.params.number);
            //workingNumber = 2143;  // Test value should = MCXLIII

            //TODO:  Convert Number to Roman Numeral
            while (workingNumber > 0) {
                // code block to be executed
                if (workingNumber >= 1000) {
                    romanNumeralStr += 'M';
                    workingNumber -= 1000;
                } else if (workingNumber >= 900) {
                    romanNumeralStr += 'CM';
                    workingNumber -= 900;
                } else if (workingNumber >= 500) {
                    romanNumeralStr += 'D';
                    workingNumber -= 500;
                } else if (workingNumber >= 400) {
                    romanNumeralStr += 'CD';
                    workingNumber -= 400;
                }  else if (workingNumber >= 100) {
                    romanNumeralStr += 'C';
                    workingNumber -= 100;
                } else if (workingNumber >= 90) {
                    romanNumeralStr += 'XC';
                    workingNumber -= 90;
                } else if (workingNumber >= 50) {
                    romanNumeralStr += 'L';
                    workingNumber -= 50;
                } else if (workingNumber >= 40) {
                    romanNumeralStr += 'XL';
                    workingNumber -= 40;
                } else if (workingNumber >= 10) {
                    romanNumeralStr += 'X';
                    workingNumber -= 10;
                }  else if (workingNumber >= 9) {
                    romanNumeralStr += 'IX';
                    workingNumber -= 9;
                } else if (workingNumber >= 5) {
                    romanNumeralStr += 'V';
                    workingNumber -= 5;
                } else if (workingNumber >= 4) {
                    romanNumeralStr += 'IV';
                    workingNumber -= 4;
                } else if (workingNumber >= 1) {
                    romanNumeralStr += 'I';
                    workingNumber -= 1;
                }
            }

            response = { numValue: romanNumeralStr }
        }

        if (isAVallidRomanNumeral = false) {
            response = { Error: 'Not a valid Number' };
        } 

        res.json(response);
    });

//Take a Roman Numeral and return it's value
romanRouter.route('/number')
    .get((req, res) => {

        const response = { Error: 'NO VALUE ENTERED, you must enter a Valid Roman Numeral`' }

        res.json(response);

    });

//Take a Roman Numeral and return it's value
romanRouter.route('/number/:romanNumeral')
    .get((req, res) => {

        let listOfChars = [];
        let isAVallidRomanNumeral = true;
        let response = {};
        let romanNumeralValue = 0;

        if (req.params.romanNumeral.length === 0) {
            isAVallidRomanNumeral = false
        }

        for (var i = 0; i < req.params.romanNumeral.length; i++) {
            listOfChars.push(req.params.romanNumeral.toUpperCase().charAt(i));
        }

        for (var i = 0; i < listOfChars.length; i++) {

            var currentLetter = romanNumerals.get(listOfChars[i]);
            var nextLetter = romanNumerals.get(listOfChars[i + 1]);

            console.log(currentLetter);
            console.log(nextLetter);

            if (romanNumerals.has(listOfChars[i])) {

                if (currentLetter < nextLetter) {
                    romanNumeralValue += nextLetter - currentLetter;
                    i++;
                } else {
                    romanNumeralValue += currentLetter;
                }

                console.log(romanNumeralValue);
            } else {
                isAVallidRomanNumeral = false;
            }

        };


        if (isAVallidRomanNumeral) {
            response = { numValue: romanNumeralValue.toString() }
        } else {
            response = { error: `${req.params.romanNumeral} is NOT a Valid Roman Numeral` }
        }

        res.json(response);

    });

app.use('/api', romanRouter);

app.get('/', (req, res) => {
    res.send('Welecome To the RomanAPI!');
})

app.listen(port, () => {
    console.log(`Running on Port ${port}`);
    //console.log(romanNumerals);
    //console.log(romanNumerals.get('M'));
})