import AdventurerFactory from "./classes/AdventurerFactory.js";
const healers = new AdventurerFactory("Healer");
const robin = healers.generate("Robin");
const fighters = new AdventurerFactory("Fighter");
const hood = fighters.generate("Hood");

console.log(healers.findByName("Robin"));
healers.findByName("Robin").duel(fighters.findByName("Hood"));
