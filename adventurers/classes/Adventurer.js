import Character from "./Character.js";
import Companion from "./Companion.js";

export default class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"];
  constructor(name, role, companionName, companionType) {
    super(name);
    // Adventurers have specialized roles.
    if (Adventurer.ROLES.includes(role)) {
      this.role = role;
    } else {
      throw "Role not found";
    }
    // Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push("bedroll", "50 gold coins");
    this.companion = new Companion(companionName, companionType);
  }
  // Adventurers have the ability to scout ahead of them.
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
  drop(item) {
    // new ability
    this.inventory = this.inventory.filter((obj) => {
      return obj !== item;
    });
  }
  heal() {
    this.health = this.MAX_HEALTH;
  }
  takeDamage(points) {
    this.health -= points;
    if (this.health <= 0) {
      this.die();
    }
  }
  die() {
    console.log(`${this.name} has died`);
  }
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }
  singleRound(adversary) {
    const selfRoll = this.roll();
    const adversaryRoll = adversary.roll();
    if (selfRoll > adversaryRoll) {
      adversary.takeDamage(1);
    } else {
      this.takeDamage(1);
    }
    console.log(
      `${this.name} Roll`,
      selfRoll,
      `${adversary.name} Roll`,
      adversaryRoll,
      `${this.name} Health`,
      this.health,
      `${adversary.name} Health`,
      adversary.health
    );
  }
  duel(adversary) {
    console.log(adversary);
    while (this.health > 50 && adversary.health > 50) {
      this.singleRound(adversary);
    }
  }
}
