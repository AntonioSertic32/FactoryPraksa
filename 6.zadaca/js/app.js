// Deklariranje klase Hero
class Hero {
  intelligence = 0;
  strength = 0;
  speed = 0;
  durability = 0;
  power = 0;
  combat = 0;

  constructor(name, powerstats, image) {
    this.name = name;

    if (powerstats.intelligence != "null") {
      this.intelligence = powerstats.intelligence;
    }
    if (powerstats.strength != "null") {
      this.strength = powerstats.strength;
    }
    if (powerstats.speed != "null") {
      this.speed = powerstats.speed;
    }
    if (powerstats.durability != "null") {
      this.durability = powerstats.durability;
    }
    if (powerstats.power != "null") {
      this.power = powerstats.power;
    }
    if (powerstats.combat != "null") {
      this.combat = powerstats.combat;
    }
    this.image = image.url;
  }
}

// Deklariranje klase Game
class Game {
  heroes = [];

  polufinale = [];
  finale = [];

  keys = ["intelligence", "strength", "speed", "durability", "power", "combat"];

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

// Kreiranje objekta Game
var game = new Game();

// Dohvaca 10 jedinstvenih heroja
var id_array = [];
var i = 0;
while (i < 10) {
  var id = Math.floor(Math.random() * 732);
  if (jQuery.inArray(id, id_array) === -1) {
    id_array.push(id);
    CheckIn(id);
    i++;
  }
}

// Funkcija koja dohvaca heroje sa api-ja preko id-a
function CheckIn(id) {
  fetch("https://superheroapi.com/api/1495869663918880/" + id)
    .then((res) => res.json())
    .then((data) => {
      game.heroes.push(new Hero(data.name, data.powerstats, data.image));
    })
    .catch((error) => console.log("ERROR"));
}

// Manipulacija slajderom i thumbnail-ima
$(".prev").prop("disabled", true);
$(".prev").css({ "background-color": "initial", cursor: "default" });

setTimeout(() => {
  console.log(game.heroes);
  var brojac = 0;
  $("#thumbnail > a > .hero_icon").each(function () {
    $(this).attr("src", game.heroes[brojac].image);
    brojac++;
  });
  $("#slider_icon").attr("src", game.heroes[0].image);
  $("#slider_hero_name").html(game.heroes[0].name);
}, 3000);

// Funkcionalnost odabira heroja
var trenutni_heroj = 0;

function Slajder(vrijednost) {
  if (vrijednost == "prev") {
    trenutni_heroj--;
  } else if (vrijednost == "next") {
    trenutni_heroj++;
  } else if (vrijednost == "rand") {
    trenutni_heroj = Math.floor(Math.random() * 10);
  } else {
    trenutni_heroj = vrijednost;
  }

  if (trenutni_heroj == 0) {
    $(".prev").prop("disabled", true);
    $(".prev").css({ "background-color": "initial", cursor: "default" });
  } else {
    $(".prev").prop("disabled", false);
    $(".prev").css({ "background-color": "#003DA7", cursor: "pointer" });
  }

  if (trenutni_heroj == 9) {
    $(".next").prop("disabled", true);
    $(".next").css({ "background-color": "initial", cursor: "default" });
  } else {
    $(".next").prop("disabled", false);
    $(".next").css({ "background-color": "#003DA7", cursor: "pointer" });
  }

  $(".inFocus").removeClass("inFocus");
  var thumbnail = "#thumbnail a:nth-child(" + (trenutni_heroj + 1) + ") img";
  $(thumbnail).addClass("inFocus");

  $("#slider_icon").attr("src", game.heroes[trenutni_heroj].image);
  $("#slider_hero_name").html(game.heroes[trenutni_heroj].name);
}

function Turnir() {
  $(".main-container").css("display", "none");
  $(".turnir-container").css("display", "grid");
  $(".pokreni").css("display", "none");

  Random_Hero();
  setTimeout(() => {
    var brojac = 0;
    $(".cetvrtfinale").each(function () {
      $(this).attr("src", game.heroes[brojac].image);
      brojac++;
    });
  }, 100);
  setTimeout(() => {
    console.log(game.heroes);
    console.log("");
    game.Quarterfinal();
  }, 200);
}

function Random_Hero() {
  var trueFalse = 0;
  while (trueFalse < 2) {
    var random_heroj = Math.floor(Math.random() * game.heroes.length);
    if (random_heroj != trenutni_heroj) {
      game.heroes.splice(random_heroj, 1);
      trueFalse++;
    }
  }
}
// TO DO:
// - Arhitektura JS-a
// - Ako bude vise od 5 nerješenih random pobjednik
// - Ak ne dohvati sliku..
// ...

// Odigravanja

/*
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
*/
