// test api https://api.thingspeak.com/channels/2608003/feeds.json?api_key=I9DAOIIXDOCRVQ0Z&results=1
// test api2 GET https://api.thingspeak.com/channels/2597513/feeds.json?api_key=1A3P2HI0HDPRVKGJ&results=1

function getLastData() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.thingspeak.com/channels/2824415/feeds.json?api_key=TNPEQDCTJA6DJLKQ&results=1"
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

async function updateLastData() {
  try {
    const lastData = await getLastData();

    const lastDataContainer = document.getElementById("last-data");
    const field = ["field1", "field2", "field3", "field4"];
    let stringTags = "";

    for (let i = 0; i < field.length; i++) {
      stringTags += `
        <div class="md:text-center border border-b-black last:border-0 py-2 md:border-b-0 md:last:border-l md:border-l-black md:first:border-none">
          <p>${lastData["channel"]["field" + (i + 1)]}</p>
          <p class="font-bold text-2xl">
            ${parseFloat(lastData["feeds"][0]["field" + (i + 1)]).toFixed(1)}
          </p>
        </div>
      `;
    }

    lastDataContainer.innerHTML = stringTags;

    const dateLastData = document.getElementById("date-last-data");
    dateLastData.innerHTML = new Date(
      lastData["feeds"][0]["created_at"]
    ).toLocaleString();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Initial fetch
updateLastData();

// Set interval to update data every 5 seconds
setInterval(updateLastData, 5000);

