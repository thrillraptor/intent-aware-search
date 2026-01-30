import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const ChunkingService = async (post) => {
  const { _id: postId, title, content, createdAt } = post;

  if (!content || content.length === 0) return [];

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 80,
  });

  const rawChunks = await splitter.splitText(content);  

  const structuredChunk = rawChunks.map((chunkText, index) => {
    return {
      postId: postId,
      title: title,
      contentChunk: `Title: ${title}\n\n${chunkText}`,
      chunkIndex: index,
      createdAt: createdAt,
    };
  });

  return structuredChunk;
};
