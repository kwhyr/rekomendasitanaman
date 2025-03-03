// generate array label form 20 to 80
function generateArrayLabelSoilmoist() {
  let arrayLabel = [];
  for (let i = 20; i <= 80; i++) {
    arrayLabel.push(i);
  }
  return arrayLabel;
}
const labelsSoilmoist = generateArrayLabelSoilmoist();

const datasetKeringSoilmoist = labelsSoilmoist.map((label) => {
  if (label <= 20) {
    return 1;
  } else if (label > 20 && label <= 35) {
    return 1;
  } else if (label > 35 && label <= 45) {
    return (45 - label) / (45 - 35);
  } else {
    return 0;
  }
});

const datasetLembabSoilmoist = labelsSoilmoist.map((label) => {
  if (label <= 35) {
    return 0;
  } else if (label > 35 && label <= 45) {
    return (label - 35) / (45 - 35);
  } else if (label > 45 && label <= 55) {
    return 1;
  } else if (label > 55 && label <= 65) {
    return (65 - label) / (65 - 55);
  } else {
    return 0;
  }
});

const datasetBasahSoilmoist = labelsSoilmoist.map((label) => {
  if (label <= 55) {
    return 0;
  } else if (label > 55 && label <= 65) {
    return (label - 55) / (65 - 55);
  } else {
    return 1;
  }
});

const ctxSoilmoist = document.getElementById("chart-soilmoist");
new Chart(ctxSoilmoist, {
  type: "line",
  data: {
    labels: labelsSoilmoist,
    datasets: [
      {
        label: "Kering",
        data: datasetKeringSoilmoist,
        pointRadius: 0,
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Lembab",
        data: datasetLembabSoilmoist,
        pointRadius: 0,
        borderColor: "orange",
        backgroundColor: "orange",
      },
      {
        label: "Basah",
        data: datasetBasahSoilmoist,
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

// function render & calculate last data
function renderSoilmoist(params) {
  soilmoistDegrees = FuzzyLogic.soilmoistureMembership(parseFloat(params));
  document.getElementById("table-soilmoist").innerHTML = `
    <tr>
      <td class="border font-bold p-2 text-nowrap">Kering</td>
      <td class="border font-bold p-2 text-nowrap">Lembab</td>
      <td class="border font-bold p-2 text-nowrap">Basah</td>
    </tr>
    <tr>
      <td class="border p-2">${soilmoistDegrees.kering.toFixed(2)}</td>
      <td class="border p-2">${soilmoistDegrees.lembab.toFixed(2)}</td>
      <td class="border p-2">${soilmoistDegrees.basah.toFixed(2)}</td>
    </tr>
  `;
}

// function get from api https://api.thingspeak.com/channels/2824415/fields/3.json?api_key=TNPEQDCTJA6DJLKQ&results=1
function getField3() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.thingspeak.com/channels/2824415/fields/3.json?api_key=TNPEQDCTJA6DJLKQ&results=1"
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

async function updateSoilmoistData() {
  try {
    const data = await getField3();
    if (data.feeds.length > 0) {
      const soilmoistValue = parseFloat(data.feeds[0].field3);
      renderSoilmoist(soilmoistValue);
      // document.getElementById("input-soilmoist").value = parseFloat(data.feeds[0].field3);
    }
  } catch (error) {
    console.error("Error fetching soil moisture data:", error);
  } 
}

// Initial fetch
updateSoilmoistData();

// Set interval to update pH data every 5 seconds
setInterval(updateSoilmoistData, 5000);

// const hitungSoilmoist = document.getElementById("hitung-soilmoist");
// hitungSoilmoist.addEventListener("click", () => {
//   const inputSoilmoist = document.getElementById("input-soilmoist").value;
//   renderSoilmoist(inputSoilmoist);
// });
