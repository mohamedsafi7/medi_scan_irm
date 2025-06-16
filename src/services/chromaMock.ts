// Mock ChromaDB for production builds where ChromaDB is not available

export class MockChromaClient {
  async listCollections() {
    return [];
  }

  async createCollection(options: any) {
    return new MockCollection();
  }

  async getCollection(options: any) {
    return new MockCollection();
  }

  async deleteCollection(options: any) {
    return true;
  }
}

export class MockCollection {
  async add(data: any) {
    return true;
  }

  async query(options: any) {
    return {
      ids: [[]],
      metadatas: [[]],
      documents: [[]],
      distances: [[]]
    };
  }

  async count() {
    return 0;
  }

  async get(options: any) {
    return {
      ids: [],
      metadatas: [],
      documents: []
    };
  }
}

export const ChromaClient = MockChromaClient;
export const Collection = MockCollection;
