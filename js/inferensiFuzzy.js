function fuzzyRule(
  suhuDegrees,
  phDegrees,
  soilmoistDegrees,
  altitudeDegrees
) {
  // handle jika belum semua aturan terpenuhi
  if (
    suhuDegrees === null ||
    phDegrees === null ||
    soilmoistDegrees === null ||
    altitudeDegrees === null 
  ) {
    return [];
  }

  // aturan-aturan 7 tanaman untuk direkomendasikan
  let rekomendasiUrutan = [];
  // aturan padi sawah irigasi
  if (
    (suhuDegrees.rendah > 0 || suhuDegrees.sedang > 0) &&
    (phDegrees.agakMasam > 0 || phDegrees.mineral > 0) &&
    altitudeDegrees.rendah > 0 &&
    (soilmoistDegrees.lembab > 0 || soilmoistDegrees.basah > 0)
  ) {
    rekomendasiUrutan.push({
      tanaman: "Padi Sawah Irigasi",
      derajatKeanggotaan: (
        Math.max(suhuDegrees.rendah, suhuDegrees.sedang) +
        Math.max(phDegrees.agakMasam, phDegrees.mineral) +
        altitudeDegrees.rendah +
        Math.max(soilmoistDegrees.lembab, soilmoistDegrees.basah)
      )/5,
    });
  }
  // aturan pagi gogo
  if (
    (suhuDegrees.rendah > 0 || suhuDegrees.sedang > 0) &&
    (phDegrees.agakMasam > 0 || phDegrees.mineral > 0) &&
    (altitudeDegrees.rendah > 0 || altitudeDegrees.sedang > 0) &&
    (soilmoistDegrees.lembab > 0 || soilmoistDegrees.basah > 0)
  ) {
    rekomendasiUrutan.push({
      tanaman: "Padi Gogo",
      derajatKeanggotaan: Math.min(
        Math.max(suhuDegrees.rendah, suhuDegrees.sedang),
        Math.max(phDegrees.agakMasam, phDegrees.mineral),
        Math.max(altitudeDegrees.sedang, altitudeDegrees.rendah),
        Math.max(soilmoistDegrees.lembab, soilmoistDegrees.basah)
      ),
    });
  }
  // aturan jagung
  if (
    suhuDegrees.rendah > 0 &&
    (phDegrees.agakMasam > 0 || phDegrees.mineral > 0) &&
    altitudeDegrees.rendah > 0 &&
    (soilmoistDegrees.lembab > 0 || soilmoistDegrees.basah > 0)
  ) {
    rekomendasiUrutan.push({
      tanaman: "Jagung",
      derajatKeanggotaan: Math.min(
        suhuDegrees.rendah,
        Math.max(phDegrees.agakMasam, phDegrees.mineral),
        altitudeDegrees.rendah,
        Math.max(soilmoistDegrees.lembab, soilmoistDegrees.basah)
      ),
    });
  }
  // aturan kacang tanah
  if (
    (suhuDegrees.rendah > 0 || suhuDegrees.sedang > 0) &&
    (phDegrees.agakMasam > 0 || phDegrees.mineral > 0) &&
    (altitudeDegrees.rendah > 0 || altitudeDegrees.sedang > 0) &&
    soilmoistDegrees.basah > 0 
  ) {
    rekomendasiUrutan.push({
      tanaman: "Kacang Tanah",
      derajatKeanggotaan: Math.min(
        Math.max(suhuDegrees.rendah, suhuDegrees.sedang),
        Math.max(phDegrees.agakMasam, phDegrees.mineral),
        Math.max(altitudeDegrees.sedang, altitudeDegrees.rendah),
        soilmoistDegrees.basah
      ),
    });
  }
  // aturan kedelai
  if (
    suhuDegrees.rendah > 0 &&
    (phDegrees.agakMasam > 0 || phDegrees.mineral > 0) &&
    (altitudeDegrees.sedang > 0 || altitudeDegrees.rendah > 0)&&
    soilmoistDegrees.lembab > 0 
  ) {
    rekomendasiUrutan.push({
      tanaman: "Kedelai",
      derajatKeanggotaan: Math.min(
        suhuDegrees.rendah,
        Math.max(phDegrees.agakMasam, phDegrees.mineral),
        Math.max(altitudeDegrees.sedang, altitudeDegrees.rendah),
        soilmoistDegrees.lembab
      ),
    });
  }
  // aturan ubi kayu
  if (
    (suhuDegrees.rendah > 0 || suhuDegrees.sedang > 0) &&
    (phDegrees.agakMasam > 0 || phDegrees.mineral > 0) &&
    altitudeDegrees.sedang > 0 &&
    soilmoistDegrees.lembab > 0 
  ) {
    rekomendasiUrutan.push({
      tanaman: "Ubi Kayu",
      derajatKeanggotaan: Math.min(
        Math.max(suhuDegrees.rendah, suhuDegrees.sedang),
        Math.max(phDegrees.agakMasam, phDegrees.mineral),
        altitudeDegrees.sedang,
        soilmoistDegrees.lembab
      ),
    });
  }
  // aturan ubi jalar
  if (
    suhuDegrees.rendah > 0 &&
    (phDegrees.agakMasam > 0 || phDegrees.mineral > 0) &&
    (altitudeDegrees.rendah > 0 || altitudeDegrees.sedang >0) &&
    (soilmoistDegrees.lembab > 0 || soilmoistDegrees.basah > 0)
  ) {
    rekomendasiUrutan.push({
      tanaman: "Ubi Jalar",
      derajatKeanggotaan: Math.min(
        suhuDegrees.rendah,
        Math.max(phDegrees.agakMasam, phDegrees.mineral),
        Math.max(altitudeDegrees.rendah,altitudeDegrees.sedang),
        Math.max(soilmoistDegrees.lembab,soilmoistDegrees.basah)
      ),
    });
  }

  // urutkan berdasarkan nilai terbesar
  rekomendasiUrutan.sort((a, b) => b.derajatKeanggotaan - a.derajatKeanggotaan);

  return rekomendasiUrutan;
}

const buttonInferensi = document.getElementById("inferensi");
buttonInferensi.addEventListener("click", () => {

  // console.log(`Degrees of membership for ph ${phDegrees}:`, phDegrees);
  // console.log(`Degrees of membership for temp ${suhuDegrees}:`, suhuDegrees);
  // console.log(`Degrees of membership for altitude ${altitudeDegrees}:`, altitudeDegrees);
  // console.log(`Degrees of membership for moist ${soilmoistDegrees }:`, soilmoistDegrees);

  const fuzzyResult = fuzzyRule(
    suhuDegrees,
    phDegrees,
    soilmoistDegrees,
    altitudeDegrees
  );

  buttonInferensi.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 animate-spin">
      <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
    </svg>
  `;
  buttonInferensi.disabled = true;

  const result = document.getElementById("inferensi-result");
  result.innerHTML = "";

  setTimeout(() => {
    if (fuzzyResult.length > 0) {
      let stringResult = `<p>Rekomendasi tanaman yang cocok adalah: </p>`;
      stringResult += '<ol>';
      fuzzyResult.forEach((data, index) => {
        stringResult += `<li>${index + 1}. <span class="font-semibold">${data.tanaman}</span> - <small>Nilai Rekomendasi: ${data.derajatKeanggotaan.toFixed(2)}</small></li>`;
      });
      stringResult += "</ol>";
      result.innerHTML = stringResult;
    } else {
      result.innerHTML = `Rekomendasi tanaman yang cocok tidak ditemukan, tidak sesuai kriteria, atau data tidak valid`;
    }
    buttonInferensi.innerHTML = "Hitung";
    buttonInferensi.disabled = false;
  }, 2000);
});
