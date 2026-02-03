export const CosineSimilarity = (vecA, vecB) => {
  let dot = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let index = 0; index < vecA.length; index++) {
    dot += vecA[index] * vecB[index];
    normA += vecA[index] * vecA[index];
    normB += vecB[index] * vecB[index];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};
