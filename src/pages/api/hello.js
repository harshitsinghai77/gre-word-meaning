const axios = require("axios");
const googleDictionaryApi = require("google-dictionary-api");

export default async function handler(req, res) {
  const word = req.body.term;
  const meaning = await googleDictionaryApi.search(word, "en");
  res.status(200).json({ meaning });
}
