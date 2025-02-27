declare namespace Express {
  export interface Request {
    validatedQuery?: {
      latitude?: number;
      longitude?: number;
      limit?: number;
    };
  }
} 