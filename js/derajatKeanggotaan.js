class FuzzyLogic {
  // Membership function for temperature (suhu)
  static suhuMembership(x) {
    let rendah, sedang, tinggi;

    // Rendah
    if (x <= 10) {
      rendah = 1;
    } else if (x > 10 && x <= 24) {
      rendah = 1;
    } else if (x > 24 && x <= 27) {
      rendah = (27 - x) / (27 - 24);
    } else {
      rendah = 0;
    }

    // Sedang
    if (x <= 24 || x >= 34) {
      sedang = 0;
    } else if (x > 24 && x <= 27) {
      sedang = (x - 24) / (27 - 24);
    } else if (x > 27 && x <= 30) {
      sedang = 1;
    } else if (x > 30 && x <= 34) {
      sedang = (34 - x) / (34 - 30);
    } else {
      sedang = 0;
    }

    // Tinggi
    if (x <= 30) {
      tinggi = 0;
    } else if (x > 30 && x <= 34) {
      tinggi = (x - 30) / (34 - 30);
    } else {
      tinggi = 1;
    }

    return { rendah, sedang, tinggi };
  }

  // Membership function for pH
  static phMembership(x) {
    let sangatMasam, masam, agakMasam, mineral, agakAlkalis, alkalis;

    // Sangat Masam
    if (x <= 0) {
      sangatMasam = 1;
    } else if (x > 0 && x <= 4) {
      sangatMasam = 1;
    } else if (x > 4 && x <= 5) {
      sangatMasam = (5 - x) / (5 - 4);
    } else {
      sangatMasam = 0;
    }

    // Masam
    if (x <= 4 || x >= 6) {
      masam = 0;
    } else if (x > 4 && x <= 5) {
      masam = (x - 4) / (5 - 4);
    } else if (x > 5 && x <= 6) {
      masam = (6 - x) / (6 - 5);
    } else {
      masam = 0;
    }

    // Agak Masam
    if (x <= 5 || x >= 7) {
      agakMasam = 0;
    } else if (x > 5 && x <= 6) {
      agakMasam = (x - 5) / (6 - 5);
    } else if (x > 6 && x <= 7) {
      agakMasam = (7 - x) / (7 - 6);
    } else {
      agakMasam = 0;
    }

    // Mineral
    if (x <= 6 || x >= 8) {
      mineral = 0;
    } else if (x > 6 && x <= 7) {
      mineral = (x - 6) / (7 - 6);
    } else if (x > 7 && x <= 8) {
      mineral = (8 - x) / (8 - 7);
    } else {
      mineral = 0;
    }

    // Agak Alkalis
    if (x <= 7 || x >= 9) {
      agakAlkalis = 0;
    } else if (x > 7 && x <= 8) {
      agakAlkalis = (x - 7) / (8 - 7);
    } else if (x > 8 && x <= 9) {
      agakAlkalis = (9 - x) / (9 - 8);
    } else {
      agakAlkalis = 0;
    }

    // Alkalis
    if (x <= 8) {
      alkalis = 0;
    } else if (x > 8 && x <= 9) {
      alkalis = (x - 8) / (9 - 8);
    } else {
      alkalis = 1;
    }

    return { sangatMasam, masam, agakMasam, mineral, agakAlkalis, alkalis };
  }

  // Membership function for soil moisture
  static soilmoistureMembership(x) {
    let kering, lembab, basah;

    // kering
    if (x <= 20) {
      kering = 1;
    } else if (x > 20 && x <= 35) {
      kering = 1;
    } else if (x > 35 && x <= 45) {
      kering = (45 - x) / (45 - 35);
    } else {
      kering = 0;
    }

    // lembab
    if (x <= 35 || x >= 65) {
      lembab = 0;
    } else if (x > 35 && x <= 45) {
      lembab = (x - 35) / (45 - 35);
    } else if (x > 45 && x <= 55) {
      lembab = 1;
    } else if (x > 55 && x <= 65) {
      lembab = (65 - x) / (65 - 55);
    } else {
      lembab = 0;
    }

    // basah
    if (x <= 55) {
      basah = 0;
    } else if (x > 55 && x <= 65) {
      basah = (x - 55) / (65 - 55);
    } else {
      basah = 1;
    }

    return { kering, lembab, basah };
  }

  // Membership function for altitude
  static altitudeMembership(x) {
    let rendah, sedang, tinggi;

    // Rendah
    if (x <= 0) {
      rendah = 1;
    } else if (x > 0 && x <= 675) {
      rendah = 1;
    } else if (x > 675 && x <= 725) {
      rendah = (725 - x) / (725 - 675);
    } else {
      rendah = 0;
    }

    // Sedang
    if (x <= 675 || x >= 1525) {
      sedang = 0;
    } else if (x > 675 && x <= 725) {
      sedang = (x - 675) / (725 - 675);
    } else if (x > 725 && x <= 1475) {
      sedang = 1;
    } else if (x > 1475 && x <= 1525) {
      sedang = (1525 - x) / (1525 - 1475);
    } else {
      sedang = 0;
    }

    // Tinggi
    if (x <= 1475) {
      tinggi = 0;
    } else if (x > 1475 && x <= 1525) {
      tinggi = (x - 1475) / (1525 - 1475);
    } else {
      tinggi = 1;
    }

    return { rendah, sedang, tinggi };
  }
}

// Global Variable for Fuzzy Logic
let suhuDegrees = null;
let phDegrees = null;
let soilmoistDegrees = null;
let altitudeDegrees = null;

// Example usage:
// let suhu = 26;
// let suhuDegrees = FuzzyLogic.suhuMembership(suhu);
// console.log(`Degrees of membership for temperature ${suhu}:`, suhuDegrees);

// let ph = 6.5;
// let phDegrees = FuzzyLogic.phMembership(ph);
// console.log(`Degrees of membership for pH ${ph}:`, phDegrees);

// let nitrogen = 350;
// let nitrogenDegrees = FuzzyLogic.nitrogenMembership(nitrogen);
// console.log(`Degrees of membership for nitrogen ${nitrogen}:`, nitrogenDegrees);

// let fosfor = 300;
// let fosforDegrees = FuzzyLogic.fosforMembership(fosfor);
// console.log(`Degrees of membership for phosphorus ${fosfor}:`, fosforDegrees);

// let kalium = 300;
// let kaliumDegrees = FuzzyLogic.kaliumMembership(kalium);
// console.log(`Degrees of membership for potassium ${kalium}:`, kaliumDegrees);
