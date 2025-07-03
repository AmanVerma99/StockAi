// import axios from "axios";
// import * as cheerio from "cheerio";

// export async function scrapeMoneycontrolNews() {
//   const url = "https://www.moneycontrol.com/news/business/markets/";
//   const { data } = await axios.get(url, {
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
//     },
//   });

//   const $ = cheerio.load(data);
//   const headlines = [];

//   $(".clearfix .listitembx").each((i, el) => {
//     const anchor = $(el).find("a");
//     const title = anchor.text().trim();
//     const link = anchor.attr("href");

//     if (title && link && link.startsWith("https://")) {
//       headlines.push({ title, link });
//     }
//   });

//   return headlines.slice(0, 10); // limit to top 10
// }
