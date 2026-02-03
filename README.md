# Intent-Aware Semantic Search Engine

Search that grasps *meaning*, not just keywords. This system uses vector embeddings to encode the semantic intent of both queries and documents — ranking results by cosine similarity for intelligent, context-aware retrieval.

## 🚀 Why This Project?

Traditional keyword search is brittle — it fails when queries and documents don't share exact vocabulary. This project bridges that gap with semantic understanding.

-   **Understands intent**, not just keywords

-   Ranks by **semantic relevance**, not lexical matches

-   Scales efficiently using **vectorized embeddings**

-   Delivers a **clean, production-ready API** for easy integration

## ✨ Core Features

-   **🔍 Semantic Search** – Retrieves documents by meaning, not just keywords, using vector embeddings.

-   **🧠 Transformer-Powered Embeddings** – Generates contextual embeddings using state-of-the-art models.

-   **📚 Smart Document Processing** – Automatically chunks and structures documents with LangChain.

-   **⚡ Fast Vector Similarity Search** – Finds the most relevant matches using efficient cosine similarity.

-   **📈 Relevance-Based Ranking** – Ranks results by semantic relevance scores.

## 🛠️ Tech Stack

### **Frontend**

-   **React.js** – Modern UI framework for building the responsive and interactive interface.
    
### **Backend**

-   **Node.js** – Runtime environment for scalable server-side logic.
    
-   **Express.js** – Minimalist web framework for building RESTful APIs.
    
-   **MongoDB** – NoSQL database for flexible and scalable document storage.
    
### **AI & NLP**

-   **Transformer.js** – JavaScript runtime for transformer models.
    
    -   **Embedding Model**: `Xenova/all-MiniLM-L6-v2` – Generates lightweight, high-quality semantic embeddings.
        
-   **LangChain** – Orchestration framework for LLM-powered applications.
    
    -   **RecursiveCharacterTextSplitter** – Splits documents into semantically meaningful chunks.
    
## 📡 API Endpoints

### `GET /posts`

Retrieves all indexed document posts from the database.
    
- **Purpose**: Fetch stored content for inspection or client-side display.

- **Response**: Array of document objects.

### `POST /search`

Performs a semantic search by comparing a query embedding with stored document embeddings.

**Request Body**

```json
{
	"searchQuery" : "your search text here",
	"topK" : 5 (Optional)
}
```
- Converts the query into a vector embedding.
- Computes cosine similarity against all stored document embeddings.
- Returns the top‑K most relevant results. 