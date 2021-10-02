function attachEventsListeners() {
    const ratios = {
        days: 1,
        hours: 24,
        minutes: 1440,
        seconds: 86400

    };

    function convert(value, unit) {
        const inDays = value / ratios[unit];
        return {
            days: inDays,
            hours: inDays * ratios.hours,
            minutes: inDays * ratios.minutes,
            seconds: inDays * ratios.seconds
        }
    }
    const daysInput = document.getElementById('days');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');

    document.getElementById('daysBtn').addEventListener('click', convertHendler);
    document.getElementById('hoursBtn').addEventListener('click', convertHendler);
    document.getElementById('minutesBtn').addEventListener('click', convertHendler);
    document.getElementsByTagName('secondsBtn').addEventListener('click', convertHendler);

    function convertHendler(e) {
        const input = e.target.parentElement.querySelector('input[type="text"]');
        const time = convert(Number(input.value), input.id);
        daysInput.value = time.days;
        hoursInput.value = time.hours;
        minutesInput.value = time.minutes;
        secondsInput.value = time.seconds;
    }
    // document.querySelector('main').addEventListener('click', convertHendler);


    // function convertHendler(e) {
    //     if (e.target.type == 'button' && e.target.tagName == 'INPUT') {

    //         const input = e.target.parentElement.querySelector('input[type="text"]');

    //         const time = convert(Number(input.value), input.id);
    //         daysInput.value = time.days;
    //         hoursInput.value = time.hours;
    //         minutesInput.value = time.minutes;
    //         secondsInput.value = time.seconds;  

    //     }
    // }
}