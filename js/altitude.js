// generate array label form 0 to 2500
function generateArrayLabelAltitude() {
  let arrayLabel = [];
  for (let i = 0; i <= 2500; i++) {
    arrayLabel.push(i);
  }
  return arrayLabel;
}
const labelsAltitude = generateArrayLabelAltitude();

const datasetRendahAltitude = labelsAltitude.map((label) => {
  if (label <= 0) {
    return 1;
  } else if (label > 0 && label <= 675) {
    return 1;
  } else if (label > 675 && label <= 725) {
    return (725 - label) / (725 - 675);
  } else {
    return 0;
  }
});

const datasetSedangAltitude = labelsAltitude.map((label) => {
  if (label <= 675) {
    return 0;
  } else if (label > 675 && label <= 725) {
    return (label - 675) / (725 - 675);
  } else if (label > 725 && label <= 1475) {
    return 1;
  } else if (label > 1475 && label <= 1525) {
    return (1525 - label) / (1525 - 1475);
  } else {
    return 0;
  }
});

const datasetTinggiAltitude = labelsAltitude.map((label) => {
  if (label <= 1475) {
    return 0;
  } else if (label > 1475 && label <= 1525) {
    return (label - 1475) / (1525 - 1475);
  } else {
    return 1;
  }
});

// function render & calculate last data
function renderAltitude(params) {
  altitudeDegrees = FuzzyLogic.altitudeMembership(parseFloat(params));
  document.getElementById("table-altitude").innerHTML = `
    <tr>
      <td class="border font-bold p-2 text-nowrap">Rendah</td>
      <td class="border font-bold p-2 text-nowrap">Sedang</td>
      <td class="border font-bold p-2 text-nowrap">Tinggi</td>
    </tr>
    <tr>
      <td class="border p-2">${altitudeDegrees.rendah.toFixed(2)}</td>
      <td class="border p-2">${altitudeDegrees.sedang.toFixed(2)}</td>
      <td class="border p-2">${altitudeDegrees.tinggi.toFixed(2)}</td>
    </tr>
  `;
}

// function get from api https://api.thingspeak.com/channels/2824415/fields/4.json?api_key=TNPEQDCTJA6DJLKQ&results=1
function getField4() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.thingspeak.com/channels/2824415/fields/4.json?api_key=TNPEQDCTJA6DJLKQ&results=1"
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

(async () => {
  const data = await getField4();
  renderAltitude(data.feeds[0].field4);
  document.getElementById("input-altitude").value =
    parseFloat(data.feeds[0].field4);
})();

const ctxAltitude = document.getElementById("chart-altitude");
new Chart(ctxAltitude, {
  type: "line",
  data: {
    labels: labelsAltitude,
    datasets: [
      {
        label: "Rendah",
        data: datasetRendahAltitude,
        pointRadius: 0,
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Sedang",
        data: datasetSedangAltitude,
        pointRadius: 0,
        borderColor: "orange",
        backgroundColor: "orange",
      },
      {
        label: "Tinggi",
        data: datasetTinggiAltitude,
        pointRadius: 0,
        borderColor: "purple",
        backgroundColor: "purple",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const hitungAltitude = document.getElementById("hitung-altitude");
hitungAltitude.addEventListener("click", () => {
  const inputAltitude = document.getElementById("input-altitude").value;
  renderAltitude(inputAltitude);
});
