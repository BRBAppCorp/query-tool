const _ = require("lodash");
const csv = require("csvtojson");
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("out.csv");

const filepath = "list.csv";

async function CreateLinks() {
  await csv()
    .fromFile(filepath)
    .then(async data => {
      const arr = [];

      var companies = "";

      await data.forEach(async (item, index) => {
        const check = companies.split(",").length;
        const calc = Math.floor(data.length / 50);

        if (item.Company) {
          if (check < 50) {
            companies += item.Company.split(",")[0] + ", ";
          } else if (check === 50) {
            arr.push({
              url: `https://www.linkedin.com/sales/search/people?companyIncluded=${companies}t&companySize=C&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=1&rsLogId=211360562&searchSessionId=pI83V8m7QgSamnZdH%2BjKXg%3D%3D&titleIncluded=CEO%2CCFO%2CController%2CFounder%2COwner%2CCo-founder&titleTimeScope=CURRENT`
                .split("|")
                .join("")
            });
            console.log(`${arr.length} of ${calc} querys created.`);
            companies = "";
          } else {
            arr.push({
              url: `https://www.linkedin.com/sales/search/people?companyIncluded=${companies}t&companySize=C&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=1&rsLogId=211360562&searchSessionId=pI83V8m7QgSamnZdH%2BjKXg%3D%3D&titleIncluded=CEO%2CCFO%2CController%2CFounder%2COwner%2CCo-founder&titleTimeScope=CURRENT`
                .split("|")
                .join("")
            });
            console.log(`${arr.length} of ${calc} querys created.`);
            companies = "";
          }
        }
      });
      await fastcsv.write(arr, { headers: true }).pipe(ws);
      console.log("Job Done.");
    });
}

CreateLinks();
