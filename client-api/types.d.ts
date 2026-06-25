declare global {
  namespace Express {
    interface Request {
      user: { id: number };
    }
    interface Response {
      data: (data?: any, status?: number) => void;
    }
  }
}
export {};
