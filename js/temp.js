// generate array label form 10 to 40
function generateArrayLabelTemp() {
  let arrayLabel = [];
  for (let i = 10; i <= 40; i++) {
    arrayLabel.push(i);
  }
  return arrayLabel;
}
const labelsTemp = generateArrayLabelTemp();

const datasetSuhuRendah = labelsTemp.map((label) => {
  if (label <= 24) {
    return 1;
  } else if (label > 24 && label <= 27) {
    return (27 - label) / (27 - 24);
  } else {
    return 0;
  }
});

const datasetSuhuSedang = labelsTemp.map((label) => {
  if (label <= 24) {
    return 0;
  } else if (label > 24 && label <= 27) {
    return (label - 24) / (27 - 24);
  } else if (label > 27 && label <= 30) {
    return 1;
  } else if (label > 30 && label <= 34) {
    return (34 - label) / (34 - 30);
  } else {
    return 0;
  }
});

const datasetSuhuTinggi = labelsTemp.map((label) => {
  if (label <= 30) {
    return 0;
  } else if (label > 30 && label <= 34) {
    return (label - 30) / (34 - 30);
  } else {
    return 1;
  }
});

const ctxTemp = document.getElementById("chart-temp");

new Chart(ctxTemp, {
  type: "line",
  data: {
    labels: labelsTemp,
    datasets: [
      {
        label: "Rendah",
        data: datasetSuhuRendah,
        pointRadius: 0,
        borderColor: "blue",
        backgroundColor: "blue",
      },
      {
        label: "Sedang",
        data: datasetSuhuSedang,
        pointRadius: 0,
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Tinggi",
        data: datasetSuhuTinggi,
        pointRadius: 0,
        borderColor: "orange",
        backgroundColor: "orange",
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
function renderTemp(params) {
  suhuDegrees = FuzzyLogic.suhuMembership(parseFloat(params));
  document.getElementById("table-temp").innerHTML = `
    <tr>
      <td class="border font-bold p-2">Rendah</td>
      <td class="border font-bold p-2">Sedang</td>
      <td class="border font-bold p-2">Tinggi</td>
    </tr>
    <tr>
      <td class="border p-2">${suhuDegrees.rendah.toFixed(4)}</td>
      <td class="border p-2">${suhuDegrees.sedang.toFixed(4)}</td>
      <td class="border p-2">${suhuDegrees.tinggi.toFixed(4)}</td>
    </tr>
  `;
}

// function get from api https://api.thingspeak.com/channels/2824415/fields/1.json?api_key=TNPEQDCTJA6DJLKQ&results=1
function getField1() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.thingspeak.com/channels/2824415/fields/1.json?api_key=TNPEQDCTJA6DJLKQ&results=1"
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

async function updateTempData() {
  try {
    const data = await getField1();
    if (data.feeds.length > 0) {
      const tempValue = parseFloat(data.feeds[0].field1);
      renderTemp(tempValue);
      // document.getElementById('input-temp').value = parseFloat(lastData);
    }
  } catch (error) {
    console.error("Error fetching Temperature data:", error);
  }
}

// Initial fetch
updateTempData();

// Set interval to update temp data every 5 seconds
setInterval(updateTempData, 5000);

// const hitungTemp = document.getElementById("hitung-temp");
// hitungTemp.addEventListener("click", () => {
//   const inputTemp = document.getElementById("input-temp").value;
//   renderTemp(inputTemp);
// });
