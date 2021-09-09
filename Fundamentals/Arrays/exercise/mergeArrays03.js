function solve(arryOne, arryTwo) {
    let result = []
    for (let i = 0; i < arryOne.length; i++) {
        if (i % 2 == 0) {
            result.push(Number(arryOne[i]) + Number(arryTwo[i]))
        } else {
            result.push(arryOne[i] + arryTwo[i])
        }
    }

    console.log(result.join(' - '))
}


solve(
    ['5', '15', '23', '56', '35'],
    ['17', '22', '87', '36', '11']
)

solve(
    ['13', '12312', '5', '77', '4'],
    ['22', '333', '5', '122', '44']

)