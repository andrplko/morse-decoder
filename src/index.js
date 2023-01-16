const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

// function decode(expr) {
//     const encode = {
//         '10': '.',
//         '11':  '-',
//     };

//     const zero = '0';
//     const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);

//     return expr.split("").map(x => getKeyByValue(MORSE_TABLE, x)).map(x => x !== undefined ? x.split("").map(x => getKeyByValue(encode, x)) : ['**********']).map(x => (x.length > 1) ? (x.reduce((a, b) => a + b)) : x).flat().map(x => (x.length < 10) ? (zero.repeat(10 - x.length) + x) : x).reduce((a,b) => a + b);

// }

function decode(expr) {
        const encode = {
            '.': '10',
            '-':  '11',
            ' ': '**********',
        };

        const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);

        const splitArray = (str, multiple) => {
            let start = [];
            for (let i = 0; i < str.length; i += multiple) {
                const part = str.slice(i, i + multiple);
                start.push(part);
            }
            return start;
        }

        let arr1 = splitArray(expr, 10).map(x => splitArray(x, 2)).map(x => splitArray(x, 1));
        let arr2 = [];
        for (let i = 0; i < arr1.length; i++) {
            const filter = arr1[i].filter(x => x != '00').flat().map(x => getKeyByValue(encode, x)).reduce((a,b) => a + b);
            arr2.push(filter);
        }

        return arr2.map(x => MORSE_TABLE[x]).map(x => x === undefined ? ' ' : x).reduce((a, b) => a + b);
}

module.exports = {
    decode
}