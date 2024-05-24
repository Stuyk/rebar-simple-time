import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { TimeConfig } from './config.js';

const Rebar = useRebar();
const RebarEvents = Rebar.events.useEvents();

const time = {
    hour: TimeConfig.startHour,
    minute: TimeConfig.startMinute,
};

function updateTime() {
    if (TimeConfig.useServerTime) {
        const currentTime = new Date(Date.now());
        time.hour = currentTime.getHours();
        time.minute = currentTime.getMinutes();

        if (time.hour >= 24) {
            time.hour = 0;
        }
    } else {
        time.minute += TimeConfig.minutesPerMinute;
        if (time.minute >= 60) {
            time.minute = 0;
            time.hour += 1;

            if (time.hour >= 24) {
                time.hour = 0;
            }
        }
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
    Rebar.player.useWorld(player).setTime(time.hour, time.minute, 0);
}

alt.setInterval(updateTime, 60000);
RebarEvents.on('character-bound', handleUpdateTime);
