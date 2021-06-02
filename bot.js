const puppeteer = require("puppeteer");

const superagent = require("superagent");

const { Inmate, Booking } = require("./classes");

const scrapCurrentInmates = async () => {
  const browser = await puppeteer.launch({ 
      headless: true , 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  const page = await browser.newPage();

  // navigate to url and wait for page loading
  await page.goto("https://www.seminolesheriff.org/webbond/Inmates.aspx", {
    waitUntil: "domcontentloaded",
  });

  // Fill out and click
  await page.type("#txtName", "%"); // Enter wildcard text

  await page.waitForFunction(
    'document.querySelector("#divResponse").innerText.includes("Booking")'
  );

  const inmates = await page.evaluate(() => {
    //   Seminole County Sheriff Data Map
    const inmate_data_map_seminole_sheriff = (rawInmateElem) => {
      const inmateAry = rawInmateElem.innerText.split("\t");
      const nameAry = inmateAry[0].split(",");
      return {
        first_name: nameAry[1] ? nameAry[1].trim() : "",
        last_name: nameAry[0] ? nameAry[0].trim() : "",
        date_dob: inmateAry[1],
        booking_id: inmateAry[2],
        direct_link: `https://www.seminolesheriff.org/webbond/inmate.aspx?bookingnumber=${inmateAry[2]}`,
      };
    };

    const trs = Array.from(document.querySelectorAll("table tr"));
    return trs.map((tr) => {
      return inmate_data_map_seminole_sheriff(tr);
    });
  });
  return inmates;
};

// await callEndpointPromise({
//   url: "xxx",
// });

console.log("Initiate Run");
scrapCurrentInmates().then((rawInmates) => {
  const inmates = rawInmates.slice(1).map((inmate) => {
    return new Inmate({
      ...inmate,
      bookings: [new Booking({ ...inmate })],
    });
  });
  console.log("Inmates:", inmates);
});
