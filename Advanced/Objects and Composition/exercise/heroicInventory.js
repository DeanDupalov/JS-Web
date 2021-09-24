function heroRegister(heroData) {
    const result = [];
    for (let data of heroData) {
        const [name, level, itemsAll] = data.split(' / ');
        items = itemsAll ? itemsAll.split(', ') : [];

        result.push({
            "name": name,
            "level": Number(level),
            "items": items
        });
    }
    console.log(JSON.stringify(result));;
}

heroRegister(
    [
        'Isacc / 25 / Apple, GravityGun',
        'Derek / 12 / BarrelVest, DestructionSword',
        'Hes / 1 / Desolator, Sentinel, Antara'
    ]

);



