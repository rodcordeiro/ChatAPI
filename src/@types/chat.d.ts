declare global {
  namespace ChatJS {
    export interface Message {
      data: {
        content: string;
      };
      metadata: {
        author: string;
        createdAt: string;
        to: string;
      };
    }
  }
}
export {};
