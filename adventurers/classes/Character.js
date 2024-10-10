export default class Character {
  static MAX_HEALTH = 100;
  constructor(name) {
    this.name = name;
    this.health = Character.MAX_HEALTH;
    this.inventory = [];
  }
}
