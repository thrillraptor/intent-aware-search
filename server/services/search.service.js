import { CosineSimilarity } from "./similarity.service.js";

export const SimilaritySearch = ({ queryEmbedding, documents, topK = 5 }) => {
  const scoredResult = documents.map((doc) => ({
    ...doc,
    score: CosineSimilarity(queryEmbedding, doc.embedding),
  }));

  scoredResult.sort((a, b) => b.score - a.score);

  return scoredResult.slice(0, topK);
};
