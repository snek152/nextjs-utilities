import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function get(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      return handler(req, res);
    }
  };
}

export function post(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      return handler(req, res);
    }
  };
}

export function put(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PUT") {
      return handler(req, res);
    }
  };
}

export function del(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
      return handler(req, res);
    }
  };
}

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
