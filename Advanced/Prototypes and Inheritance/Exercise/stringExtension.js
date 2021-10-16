(function (solve) {


    String.prototype.ensureStart = function (str) {
    if(!this.startsWith(str)){
        return `${str}${this.toString()}`
    }
    return this.toString();
}
String.prototype.ensureEnd = function (str) {
    const val = this.endsWith(str)

    if(!this.endsWith(str)){
        return `${this.toString()}${str}`
    }
    return this.toString();
}
String.prototype.isEmpty = function () {
    return this.toString() === ''
}

String.prototype.truncate = function (n) {
    const ellipsis = '...';
    if(this.length < n){
        return this.toString()
    }

}})()
// let str = 'my string';
// console.log(str = str.ensureStart('my'));
// console.log(str)
// console.log(str = str.ensureStart('hello '));
// console.log(str)
let str2 = '';
// console.log(str2 = str2.ensureEnd('hello'));
// console.log(str2 = str2.ensureEnd(' my'));

console.log(str2.isEmpty())