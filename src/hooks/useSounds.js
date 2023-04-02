import { useState, useEffect, useRef } from "react";

import * as Tone from "tone";

import Cymbal from "assets/sounds/Cymbal.mp3";
import Drum from "assets/sounds/Drum.mp3";
import Kick from "assets/sounds/Kick.mp3";
import Snare from "assets/sounds/Snare.mp3";

export default function useSounds() {
    const mySampler = useRef(null);

    const [isCymbalPlayed, isCymbalPlayedChange] = useState(false);
    const [isDrumPlayed, isDrumPlayedChange] = useState(false);
    const [isKickPlayed, isKickPlayedChange] = useState(false);
    const [isSnarePlayed, isSnarePlayedChange] = useState(false);

    useEffect(() => {
        const sampler = new Tone.Sampler({
                C4: Cymbal,
                "D#4": Drum,
                "F#4": Kick,
                A4: Snare,
        }).toDestination();

        Tone.loaded().then(() => {
            mySampler.current = sampler;
        });
}, []);

function soundPlay(note) {
    mySampler.current.triggerAttackRelease([note], 4)
}

function handleKeyDown({key}) {
    switch(key){
        case "a":
            isCymbalPlayedChange(true);
            window.setTimeout(() => isCymbalPlayedChange(false), 300);
            soundPlay("C4");
            break;
        case "z":
            isDrumPlayedChange(true);
            window.setTimeout(() => isDrumPlayedChange(false), 300);
            soundPlay("D#4");
            break;
        case "e":
            isKickPlayedChange(true);
            window.setTimeout(() => isKickPlayedChange(false), 300);
            soundPlay("F#4");
            break;
        case "r":
            isSnarePlayedChange(true);
            window.setTimeout(() => isSnarePlayedChange(false), 300);
            soundPlay("A4");
            break;
        default:
            break;
    }
}

useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
}, );

function handleSampleChange(note, file) {
    let fileURL = URL.createObjectURL(file);
    let buffer = new Tone.Buffer(fileURL);
    mySampler.current.add(note, buffer, ()=>
        alert("Sample successfully changed")
    );
}

const buttonsList = [
    {
        soundPlay : () => soundPlay("C4"),
        isPlayed : isCymbalPlayed,
        id : "Cymbal",
        handleSampleChange : (e)=> handleSampleChange("C4", e.target.files[0]),
    },
    {
        soundPlay : () => soundPlay("D#4"),
        isPlayed : isDrumPlayed,
        id : "Drum",
        handleSampleChange : (e)=> handleSampleChange("D#4", e.target.files[0]),
    },
    {
        soundPlay : () => soundPlay("F#4"),
        isPlayed : isKickPlayed,
        id : "Kick",
        handleSampleChange : (e)=> handleSampleChange("F#4", e.target.files[0]),
    },
    {
        soundPlay : () => soundPlay("A4"),
        isPlayed : isSnarePlayed,
        id : "Snare",
        handleSampleChange : (e)=> handleSampleChange("A4", e.target.files[0]),
    },
    ];

    return { buttonsList };
}