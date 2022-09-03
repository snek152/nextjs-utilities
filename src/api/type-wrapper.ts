import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * Type for the `typeWrapper` function parameters
 */
export type ExtendedApiHandler<T, K> = {
  (
    req: Omit<NextApiRequest, "body" | "query"> & { body: T },
    res: NextApiResponse<K>
  ): void;
};

/**
 * Auto processes and types the request and response body for the handler to use.
 *
 * @param {ExtendedApiHandler} handler - the handler to run, with extended functionality provided by the `ExtendedApiHandler` type
 * @returns the updated handler with the request and response body types
 */
export default function typeWrapper<Req, Res>(
  handler: ExtendedApiHandler<Req, Res>
): NextApiHandler {
  return (req: NextApiRequest, res: NextApiResponse<Res>) => {
    return handler(
      Object.assign(
        req,
        req.body
          ? { body: JSON.parse(req.body) as Req }
          : { body: req.query as Req }
      ),
      res
    );
  };
}
