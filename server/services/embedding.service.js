import { embed } from "../libs/embeddingModel.js";

export const EmbeddingService = async (structuredChunk) => {
  const { contentChunk } = structuredChunk;

  if (!contentChunk) return null;

  const embedding = await embed(contentChunk);

  if (!Array.isArray(embedding)) {
    throw new Error("Embedding generation failed");
  }

  return {
    ...structuredChunk,
    embedding,
  };
};
