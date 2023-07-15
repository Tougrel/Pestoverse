import based from 'static/images/emotes/based.webp';
import chefsKiss from 'static/images/emotes/chefsKiss.webp';
import chonkePesto from 'static/images/emotes/chonkePesto.webp';
import concerned from 'static/images/emotes/concerned.webp';
import derpPesto from 'static/images/emotes/derpPesto.webp';
import hornyPesto from 'static/images/emotes/hornyPesto.webp';
import karenPesto from 'static/images/emotes/karenPesto.webp';
import luckyPesto from 'static/images/emotes/luckyPesto.webp';
import madLatePesto from 'static/images/emotes/madLatePesto.webp';
import nohorny from 'static/images/emotes/nohorny.webp';
import pestoNoted from 'static/images/emotes/pestoNoted.webp';
import pestoSailor from 'static/images/emotes/pestoSailor.webp';
import pestoToilet from 'static/images/emotes/pestoToilet.webp';
import plotPesto from 'static/images/emotes/plotPesto.webp';
import possessedPestie from 'static/images/emotes/possessedPestie.webp';
import pov from 'static/images/emotes/pov.webp';
import scream from 'static/images/emotes/scream.webp';
import shruge from 'static/images/emotes/shruge.webp';
import wheeze from 'static/images/emotes/wheeze.webp';
import wicked from 'static/images/emotes/wicked.webp';
import yesPesto from 'static/images/emotes/yesPesto.webp';

const emotes = [
    based,
    chefsKiss,
    chonkePesto,
    concerned,
    derpPesto,
    hornyPesto,
    karenPesto,
    luckyPesto,
    madLatePesto,
    nohorny,
    pestoNoted,
    pestoSailor,
    pestoToilet,
    plotPesto,
    possessedPestie,
    pov,
    scream,
    shruge,
    wheeze,
    wicked,
    yesPesto
]

export const getEmote = () => {
    const index = Math.floor(Math.random() * emotes.length)
    console.log(index)
    return emotes[index];
}