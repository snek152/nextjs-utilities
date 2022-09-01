import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type ExtendedApiHandler<T, K> = {
  (
    req:
      | (Omit<NextApiRequest, "body"> & { body: T })
      | (Omit<NextApiRequest, "query"> & { query: T }),
    res: NextApiResponse<K>
  ): void;
};

export default function typeWrapper<Req, Res>(
  handler: ExtendedApiHandler<Req, Res>
): NextApiHandler {
  return (req: NextApiRequest, res: NextApiResponse<Res>) => {
    return handler(
      Object.assign(
        req,
        req.body
          ? { body: JSON.parse(req.body) as Req }
          : { query: req.query as Req }
      ),
      res
    );
  };
}
