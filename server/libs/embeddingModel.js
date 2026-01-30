import { pipeline } from "@xenova/transformers";

let modelPromise;

/**
 * Load (once) and return the embedding model
 * */

function getModel() {
  if (!modelPromise) {
    modelPromise = pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return modelPromise;
}

/**
 * Generate embedding for a given text
 */

export async function embed(content) {
  const pipe = await getModel();

  const embedding = await pipe(content, {
    normalize: true,
    pooling: "mean",
  });

  return Array.from(embedding.data);
}
