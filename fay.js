let num = '300';
console.log(num.concat('bai code', 'thieu nhi')); //concat(substring,...,substring);
//endsWidth('substring')
let send = 'khong lam ma doi';
console.log(send.endsWith('ma doi co an'));
console.log(send.endsWith('doi'));
//includes() --> true || false
//indexOf(' ') --> take a substring and if the substring exists in a string, it returns the first position of its
//lastIndexOf('')
//match(' ')
let text = 'in 2024, i run 100 days of js';
let reg = /\d+/g //d+ : one or more digit numbers ; g : global, search anywhere
