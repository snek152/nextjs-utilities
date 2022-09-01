import { typeWrapper } from "next-utils";

export default typeWrapper<{ t: number }, { name: string; t: number }>(
  (req, res) => {
    console.log(req.body.t);
    res.status(200).json({ name: "John Doe", t: req.body.t });
  }
);
