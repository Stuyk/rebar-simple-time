export const TimeConfig = {
    // If set to true, it will override all other settings
    // This will use current server time as the main game time
    useServerTime: false,
    // If above is false, minutes-per-minute is how many minutes in-game pass per minute.
    // So if you have 2 minutes-per-minute, then every minute the in-game time goes up by 2 minutes
    // So you will effectively get 2 night cycles per 24 hours
    // Where as setting it to 6 you will get 6 night cycles per 24 hours
    minutesPerMinute: 5,
    // Starting time if not using server time
    startHour: 9,
    startMinute: 0,
};
