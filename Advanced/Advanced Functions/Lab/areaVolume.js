function vol() {
    return Math.abs(this.x * this.y * this.z);
}

function area() {
    return Math.abs(this.x * this.y);
}

const input = `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
]`

function solve(area, vol, input) {
    const result = [];
    const data = JSON.parse(input);

    data.forEach(el => {
            result.push(
                {
                    area: area.call(el),
                    volume: vol.call(el),
                }
            )
        }
    )
    return result;
}


console.log(solve(area, vol, input));

