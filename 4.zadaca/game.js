// postavljanje igraca
var igrac = 1;

// postavljanje smjera, true za naprijed, false za nazad
var smjer = true;

// dohvacanje id-a od h1 taga
var rezultat = document.getElementById("rezultat");

// krece se brojati do 100
for (var i = 1; i <= 100; i++) {
  // ako je broj jednak 100 onda ispisuje tko ga je rekao na stranicu, inace ispisuje u konzolu koji je igrac rekao taj broj
  if (i == 100) {
    rezultat.innerHTML = "Broj 100 izgovara igrač: " + igrac;
  } else {
    console.log("Igrac: " + igrac + ", izgovara broj: " + i);
  }

  // ako je broj dijeljiv bez ostatka sa 7 onda mjenja smjer
  if (i % 7 == 0) {
    if (smjer == true) {
      smjer = false;
      console.log("Promjena smjera!");
    } else {
      smjer = true;
      console.log("Promjena smjera!");
    }
  }

  // provjerava smijer te ovisno o smjeru postavlja sljedeceg igraca
  if (smjer == true) {
    // ako je broj dijeljiv sa 13 onda preskacemo jednog igraca
    if (i % 13 == 0) {
      console.log("Preskakanje igraća!");
      // ako je trenutni igrac 9 onda kako iduci ne bi bio 11 posto ima samo 10 igraca, postavlja da iduci igrac bud 1 isto i kod else if
      if (igrac == 9) {
        igrac = 1;
      } else if (igrac == 10) {
        igrac == 2;
      } else {
        igrac += 2;
      }
    } else {
      // broj nije dijeljiv sa 13 te idemo po smjeru "naprijed" na iduceg igraca
      if (igrac == 10) {
        igrac = 1;
      } else {
        igrac++;
      }
    }
  } else {
    // ako je broj dijeljiv sa 13 onda preskacemo jednog igraca
    if (i % 13 == 0) {
      console.log("Preskakanje igraća!");
      // ako je trenutni igrac 2 onda kako iduci ne bi bio 0 posto ima samo 10 igraca, postavlja da iduci igrac bud 10 isto i kod else if
      if (igrac == 2) {
        igrac = 10;
      } else if (igrac == 1) {
        igrac = 9;
      } else {
        igrac -= 2;
      }
    } else {
      // broj nije dijeljiv sa 13 te idemo po smjeru "nazad" na iduceg igraca
      if (igrac == 1) {
        igrac = 10;
      } else {
        igrac--;
      }
    }
  }
}
