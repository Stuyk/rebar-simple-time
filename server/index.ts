import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { TimeConfig } from './config.js';

const Rebar = useRebar();
const timeService = Rebar.services.useTimeService();

function updateTime() {
    const time = timeService.getTime();

    if (TimeConfig.useServerTime) {
        const currentTime = new Date(Date.now());
        timeService.setHour(currentTime.getHours());
        timeService.setMinute(currentTime.getMinutes());
    } else {
        let minute = time.minute + TimeConfig.minutesPerMinute;
        let hour = time.hour;

        if (minute >= 60) {
            minute = 0;
            hour += 1;

            if (time.hour >= 24) {
                hour = 0;
            }
        }

        timeService.setHour(hour);
        timeService.setMinute(minute);
    }

    for (let player of alt.Player.all) {
        if (!Rebar.player.useStatus(player).hasCharacter()) {
            continue;
        }

        handleUpdateTime(player);
    }

    alt.log(
        `World Time - ${time.hour <= 9 ? `0${time.hour}` : time.hour}:${time.minute <= 9 ? `0${time.minute}` : time.minute}`,
    );
}

function handleUpdateTime(player: alt.Player) {
    const time = timeService.getTime();
    Rebar.player.useWorld(player).setTime(time.hour, time.minute, 0);
}

alt.setInterval(updateTime, 60000);
alt.on('playerConnect', handleUpdateTime);
