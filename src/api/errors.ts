import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * Wraps the provided handler with a try/catch block to catch any errors that may occur.
 * @param {NextApiHandler} handler - the handler to run
 * @param {string} property - optional property name of the error object returned
 * @returns {NextApiHandler} the handler wrapped with a try/catch block
 */
export default function catcher(
  handler: NextApiHandler,
  property: string = "error"
): NextApiHandler {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      handler(req, res);
    } catch (err) {
      res.status(500).json({ [property]: err.message });
    }
  };
}
