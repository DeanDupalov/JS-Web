function checkWorkerHydratation(work) {
    function getNeededWater() {
        return (work.weight * 0.1) * work.experience;
     
    }
    if (work.dizziness) {
        work.levelOfHydrated += getNeededWater();
        work.dizziness = false;

    }

    return work;
}
const worker1 = {
    weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true
}
const worker2 = {
    weight: 120,
    experience: 20,
    levelOfHydrated: 200,
    dizziness: true
}

const worker3 = {
    weight: 95,
    experience: 3,
    levelOfHydrated: 0,
    dizziness: false
}


console.log(checkWorkerHydratation(worker1));
console.log(checkWorkerHydratation(worker2));
console.log(checkWorkerHydratation(worker3));
