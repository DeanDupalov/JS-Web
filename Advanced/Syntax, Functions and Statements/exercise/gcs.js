function gcd(a, b) {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }

};


console.log(gcd(15, 5))




function gcd2(a, b) {
    while (b!=0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

console.log(gcd2(15, 5))