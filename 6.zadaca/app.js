// Deklariranje klase Hero
class Hero {
  intelligence = 0;
  strength = 0;
  speed = 0;
  durability = 0;
  power = 0;
  combat = 0;

  constructor(name, intelligence, strength, speed, durability, power, combat) {
    this.name = name;
    if (intelligence != "null") {
      this.intelligence = intelligence;
    }
    if (strength != "null") {
      this.strength = strength;
    }
    if (speed != "null") {
      this.speed = speed;
    }
    if (durability != "null") {
      this.durability = durability;
    }
    if (power != "null") {
      this.power = power;
    }
    if (combat != "null") {
      this.combat = combat;
    }
  }
}

// Deklariranje klase Game
class Game {
  heroes = [];

  polufinale = [];
  finale = [];

  keys = ["intelligence", "strength", "speed", "durability", "power", "combat"];

  // Funkcija koja dohvaca heroje sa api-ja
  CheckIn(id) {
    fetch("https://superheroapi.com/api/1495869663918880/" + id + "/powerstats")
      .then((res) => res.json())
      .then((data) => {
        this.heroes.push(
          new Hero(
            data.name,
            data.intelligence,
            data.strength,
            data.speed,
            data.durability,
            data.power,
            data.combat
          )
        );
      })
      .catch((error) => console.log("ERROR"));
  }

  // Funkcija koja izvrsava borbe heroja
  Match(first, second) {
    var prvi_heroj = 0;
    var drugi_heroj = 0;
    var kraj = false;

    while (kraj != true) {
      var prvi_random_broj = this.keys.length * Math.random();
      var drugi_random_broj = this.keys.length * Math.random();

      var prvo_svojstvo = this.keys[prvi_random_broj << 0];
      var drugo_svojstvo = this.keys[drugi_random_broj << 0];

      var vrijednost_prvog =
        parseInt(first[prvo_svojstvo]) + parseInt(first[drugo_svojstvo]);
      var vrijednost_drugog =
        parseInt(second[prvo_svojstvo]) + parseInt(second[drugo_svojstvo]);

      if (vrijednost_prvog > vrijednost_drugog) {
        prvi_heroj++;

        if (prvi_heroj == 2) {
          kraj = true;

          console.log(
            "%c" +
              first.name +
              "%c - %c" +
              second.name +
              " %c" +
              prvi_heroj +
              " - " +
              drugi_heroj,
            "color: green",
            "color: white",
            "color: red",
            "color: white"
          );

          return first;
        }
      } else if (vrijednost_prvog < vrijednost_drugog) {
        drugi_heroj++;

        if (drugi_heroj == 2) {
          kraj = true;
          console.log(
            "%c" +
              first.name +
              "%c - %c" +
              second.name +
              " %c" +
              prvi_heroj +
              " - " +
              drugi_heroj,
            "color: red",
            "color: white",
            "color: green",
            "color: white"
          );

          return second;
        }
      }
    }
  }

  // Cetvrtfinale
  Quarterfinal() {
    console.log("********** Četvrtfinale **********");
    for (var i = 0; i < 8; i += 2) {
      this.polufinale.push(this.Match(this.heroes[i], this.heroes[i + 1]));
    }
  }

  // Polufinale
  Semifinal() {
    console.log("********** Polufinale **********");
    for (var i = 0; i < 4; i += 2) {
      this.finale.push(this.Match(this.polufinale[i], this.polufinale[i + 1]));
    }
  }

  // Finale
  Finale() {
    console.log("********** Finale **********");
    for (var i = 0; i < 2; i += 2) {
      this.Match(this.finale[i], this.finale[i + 1]);
    }
  }
}

// Kreiranje objekta Game i pozivanja njegovih metoda
var game = new Game();

for (var i = 0; i < 8; i++) {
  var id = Math.floor(Math.random() * 732);
  game.CheckIn(id);
}

setTimeout(() => {
  console.log(game.heroes);
  console.log("");
  game.Quarterfinal();
  console.log("");
  game.Semifinal();
  console.log("");
  game.Finale();
}, 2000);
