class List {
    constructor() {
        this.list = [];
        this.size = 0
    }
    _sortList(){
        this.list.sort((a, b) => a - b);

    }
    _validateInput(el){
        if (typeof el !== 'number') {
            throw Error('Value must be an Integer')
        }
    }
    _isInRange(index){
        if(index < 0 || index > this.list.length-1){
            throw Error('Index out of range!')
        }
    }
    add(element) {
        this._validateInput(element);
        this.list.push(element);
        this.size += 1
        this._sortList();
    }

    remove(index) {
        this._validateInput(index);
        this._isInRange(index);
        this.list.splice(index, 1);
        this.size -= 1
    }

    get(index) {
        this._validateInput(index);
        this._isInRange(index);
        return this.list[index];
    }

    // get size() {
    //     return this._size;
    // }
}

// expect(result.prototype.hasOwnProperty('remove')).to.equal(true, "Function remove() was not found");
// expect(result.prototype.hasOwnProperty('get')).to.equal(true, "Function get() was not found");

var myList = new result();
// expect(myList.hasOwnProperty('size')).to.equal(true, "Property size was not found");

for (let i = 0; i < 5; i++) {
    myList.add(i);
}

myList.remove(0);
// expect(myList.size).to.equal(4, "Element wasn't removed");
console.log(myList.size)
var expectedArray = [1, 2, 3, 4];
// Compare with collection
for (let i = 0; i < expectedArray.length; i++) {
    expect(myList.get(i)).to.equal(expectedArray[i], "Element wasn't removed");
}
