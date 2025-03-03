// generate array label form 0 to 10
function generateArrayLabelPH() {
  let arrayLabel = [];
  for (let i = 0; i <= 10; i++) {
    arrayLabel.push(i);
  }
  return arrayLabel;
}
const labelsPH = generateArrayLabelPH();

const datasetSangatMasam = labelsPH.map((label) => {
  if (label <= 4) {
    return 1;
  } else if (label > 4 && label <= 5) {
    return (5 - label) / (5 - 4);
  } else {
    return 0;
  }
});

const datasetMasam = labelsPH.map((label) => {
  if (label <= 4) {
    return 0;
  } else if (label > 4 && label <= 5) {
    return (label - 4) / (5 - 4);
  } else if (label > 5 && label <= 6) {
    return (6 - label) / (6 - 5);
  } else {
    return 0;
  }
});

const datasetAgakMasam = labelsPH.map((label) => {
  if (label <= 5) {
    return 0;
  } else if (label > 5 && label <= 6) {
    return (label - 5) / (6 - 5);
  } else if (label > 6 && label <= 7) {
    return (7 - label) / (7 - 6);
  } else {
    return 0;
  }
});

const datasetNetral = labelsPH.map((label) => {
  if (label <= 6) {
    return 0;
  } else if (label > 6 && label <= 7) {
    return (label - 6) / (7 - 6);
  } else if (label > 7 && label <= 8) {
    return (8 - label) / (8 - 7);
  } else {
    return 0;
  }
});

const datasetAgakAlkalis = labelsPH.map((label) => {
  if (label <= 7) {
    return 0;
  } else if (label > 7 && label <= 8) {
    return (label - 7) / (8 - 7);
  } else if (label > 8 && label <= 9) {
    return (9 - label) / (9 - 8);
  } else {
    return 0;
  }
});

const datasetSangatAlkalis = labelsPH.map((label) => {
  if (label <= 8) {
    return 0;
  } else if (label > 8 && label <= 9) {
    return (label - 8) / (9 - 8);
  } else {
    return 1;
  }
});

const ctxPh = document.getElementById("chart-ph");
new Chart(ctxPh, {
  type: "line",
  data: {
    labels: labelsPH,
    datasets: [
      {
        label: "Sangat Masam",
        data: datasetSangatMasam,
        pointRadius: 0,
        borderColor: "blue",
        backgroundColor: "blue",
      },
      {
        label: "Masam",
        data: datasetMasam,
        pointRadius: 0,
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Agak Masam",
        data: datasetAgakMasam,
        pointRadius: 0,
        borderColor: "orange",
        backgroundColor: "orange",
      },
      {
        label: "Netral",
        data: datasetNetral,
        pointRadius: 0,
        borderColor: "purple",
        backgroundColor: "purple",
      },
      {
        label: "Agak Alkalis",
        data: datasetAgakAlkalis,
        pointRadius: 0,
        borderColor: "green",
        backgroundColor: "green",
      },
      {
        label: "Sangat Alkalis",
        data: datasetSangatAlkalis,
        pointRadius: 0,
        borderColor: "lightblue",
        backgroundColor: "lightblue",
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

// function renderPh & calculate last data
function renderPh(params) {
  phDegrees = FuzzyLogic.phMembership(parseFloat(params));
  document.getElementById("table-ph").innerHTML = `
    <tr>
      <td class="border font-bold p-2">Sangat Masam</td>
      <td class="border font-bold p-2">Masam</td>
      <td class="border font-bold p-2">Agak Masam</td>  
      <td class="border font-bold p-2">Netral</td>
      <td class="border font-bold p-2">Agak Alkalis</td>
      <td class="border font-bold p-2">Sangat Alkalis</td>
    </tr>
    <tr>
      <td class="border p-2">${phDegrees.sangatMasam.toFixed(2)}</td>
      <td class="border p-2">${phDegrees.masam.toFixed(2)}</td>
      <td class="border p-2">${phDegrees.agakMasam.toFixed(2)}</td>
      <td class="border p-2">${phDegrees.mineral.toFixed(2)}</td>
      <td class="border p-2">${phDegrees.agakAlkalis.toFixed(2)}</td>
      <td class="border p-2">${phDegrees.alkalis.toFixed(2)}</td>
    </tr>
  `;
}

// function get from api https://api.thingspeak.com/channels/2824415/fields/2.json?api_key=TNPEQDCTJA6DJLKQ&results=1
function getField2() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.thingspeak.com/channels/2824415/fields/2.json?api_key=TNPEQDCTJA6DJLKQ&results=1"
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// Function to update pH data in real-time
async function updatePhData() {
  try {
    const data = await getField2();
    if (data.feeds.length > 0) {
      const phValue = parseFloat(data.feeds[0].field2);
      renderPh(phValue);
      // document.getElementById("input-ph").value = phValue;
    }
  } catch (error) {
    console.error("Error fetching pH data:", error);
  }
}

// Initial fetch
updatePhData();

// Set interval to update pH data every 5 seconds
setInterval(updatePhData, 5000);

// Event listener for manual calculation
// const hitungPh = document.getElementById("hitung-ph");
// hitungPh.addEventListener("click", () => {
//   const inputPh = document.getElementById("input-ph").value;
//   renderPh(inputPh);
// });
