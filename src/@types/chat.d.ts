declare global {
  namespace ChatJS {
    export interface Message {
      data: {
        content: string;
      };
      metadata: {
        id?: string;
        author: string;
        createdAt: string;
        to: string;
      };
    }
  }
}
export {};
