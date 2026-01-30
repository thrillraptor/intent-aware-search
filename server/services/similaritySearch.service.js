import { cosineSimilarity } from "./cosineSimilarity.service.js";

export const similaritySearch = ({ queryEmbedding, documents, topK = 5 }) => {
  const scoredResult = documents.map((doc) => ({
    ...doc,
    score: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  scoredResult.sort((a, b) => b.score - a.score);

  return scoredResult.slice(0, topK);
};
