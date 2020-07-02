var heroes = [];
var polufinale = [];
var finale = [];
var pof = false;

class Hero {
  constructor(intelligence, strength, speed, durability, power, combat) {
    this.intelligence = intelligence;
    this.strength = strength;
    this.speed = speed;
    this.durability = durability;
    this.power = power;
    this.combat = combat;
  }
}

get_eight_superheroes();

function get_eight_superheroes() {
  for (var i = 0; i < 8; i++) {
    var random_hero = Math.floor(Math.random() * 732);
    getSuperheroes(random_hero);
  }
  console.log(heroes);
}

function getSuperheroes(id) {
  fetch("https://superheroapi.com/api/1495869663918880/" + id + "/powerstats")
    .then((res) => res.json())
    .then((data) => heroes.push(data))
    .catch((error) => console.log("ERROR"));
}

setTimeout(() => {
  console.log("********** Četvrtfinale **********");
  console.log("");
  console.log("*** 1. Meč ***");
  Match(heroes[0], heroes[1]);
  console.log("*** 2. Meč ***");
  Match(heroes[2], heroes[3]);
  console.log("*** 3. Meč ***");
  Match(heroes[4], heroes[5]);
  console.log("*** 4. Meč ***");
  Match(heroes[6], heroes[7]);

  pof = true;
  console.log("********** Polufinale **********");
  console.log("");
  console.log("*** 1. Meč ***");
  Match(polufinale[0], polufinale[1]);
  console.log("*** 2. Meč ***");
  Match(polufinale[2], polufinale[3]);

  console.log("********** Finale **********");
  console.log("");
  Match(finale[0], finale[1]);
}, 1500);

var keys = [
  "intelligence",
  "strength",
  "speed",
  "durability",
  "power",
  "combat",
];

var Match = function (obj1, obj2) {
  var prvi_heroj = 0;
  var drugi_heroj = 0;
  var kraj = 0;

  while (kraj < 1) {
    random_broj = keys.length * Math.random();

    var vrijednost = keys[random_broj << 0];

    var vrijednost_prvog = obj1[vrijednost];

    if (vrijednost_prvog == "null") {
      vrijednost_prvog = 0;
    }
    var vrijednost_drugog = obj2[vrijednost];

    if (vrijednost_drugog == "null") {
      vrijednost_drugog = 0;
    }

    if (vrijednost_prvog > vrijednost_drugog) {
      prvi_heroj++;

      if (prvi_heroj == 2) {
        kraj++;

        console.log(
          "%c" +
            obj1.name +
            "%c - %c" +
            obj2.name +
            " %c" +
            prvi_heroj +
            " - " +
            drugi_heroj,
          "color: green",
          "color: white",
          "color: red",
          "color: white"
        );
        if (pof == false) {
          polufinale.push(obj1);
        } else {
          finale.push(obj1);
        }

        console.log("");
      }
    } else if (vrijednost_prvog < vrijednost_drugog) {
      drugi_heroj++;

      if (drugi_heroj == 2) {
        kraj++;
        console.log(
          "%c" +
            obj1.name +
            "%c - %c" +
            obj2.name +
            " %c" +
            prvi_heroj +
            " - " +
            drugi_heroj,
          "color: red",
          "color: white",
          "color: green",
          "color: white"
        );
        if (pof == false) {
          polufinale.push(obj2);
        } else {
          finale.push(obj2);
        }
        console.log("");
      }
    }
  }
};
