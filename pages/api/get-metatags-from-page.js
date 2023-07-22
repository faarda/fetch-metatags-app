// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { load } from "cheerio";
import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const url = req.query.url;

  try {
    const response = await fetch(url, {
      method: "GET",
      // headers: {
      //   "User-Agent":
      //     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      //   Cookie:
      //     "csrftoken=nZAMBFTvr6nQSaMUQ9aYqdY4xh29B0ta; ig_did=3B9AB38B-0D05-4179-BF27-B72534385FB9; ig_nrcb=1; mid=ZLhacgAEAAFgSKuReLyJlwoMPbIz; datr=cFq4ZFAEyJ_Pob050o_FW8vD",
      // },
    });
    const html = await response.text();

    // const html = response.data;
    const $ = load(html);

    const metaData = {
      title: $("title").text(),
      description:
        $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
    };

    res.status(200).send({ message: "Metadata fetched", data: metaData });
    // return metaData;
  } catch (error) {
    // console.error('Error fetching meta data:', error.message);
    // return null;

    res.status(500).send({ message: "Something went wrong" });
  }
}
