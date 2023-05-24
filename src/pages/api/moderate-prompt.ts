// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//📚 ///////////////////////////////////////////////////////////📚//
// OpenAI createImage API reference:
// https://platform.openai.com/docs/api-reference/moderations
//📚 ///////////////////////////////////////////////////////////📚//

import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.body;
  await openai.createModeration({
    input: prompt
  }).then (response => {
    console.log(response.data.results[0]);
    res.status(200).send(response.data.results[0].flagged);
  })
}