import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * Runs the handler if the request method is GET. Meant to be used with the `withMethod` function.
 * @param {NextApiHandler} handler - the handler to run
 * @returns the updated handler with the method check
 */
export function get(handler: NextApiHandler): NextApiHandler {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      return handler(req, res);
    }
  };
}

/**
 * Runs the handler if the request method is POST. Meant to be used with the `withMethod` function.
 * @param {NextApiHandler} handler - the handler to run
 * @returns the updated handler with the method check
 */
export function post(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      return handler(req, res);
    }
  };
}

/**
 * Runs the handler if the request method is PUT or PATCH. Meant to be used with the `withMethod` function.
 * @param {NextApiHandler} handler - the handler to run
 * @returns the updated handler with the method check
 */
export function put(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PUT" || req.method === "PATCH") {
      return handler(req, res);
    }
  };
}

/**
 * Runs the handler if the request method is DELETE. Meant to be used with the `withMethod` function.
 * @param {NextApiHandler} handler - the handler to run
 * @returns the updated handler with the method check
 */
export function del(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
      return handler(req, res);
    }
  };
}

/**
 * Uses list of handlers and runs the first one that matches the request method.
 * @param handlers - the list of handlers created
 * @returns the updated handler with all handlers incorporated
 */
export default function withMethod(
  ...handlers: ((req: NextApiRequest, res: NextApiResponse) => any)[]
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const methods = handlers.map((handler) =>
      handler
        .toString()
        .slice(
          handler.toString().indexOf('"') + 1,
          handler.toString().indexOf('"', handler.toString().indexOf('"') + 1)
        )
    );
    if (!methods.includes(req.method!)) {
      return res.status(405).end();
    }
    for (const handler of handlers) {
      handler(req, res);
    }
    return;
  };
}
