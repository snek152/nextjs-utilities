import { get, post, withMethod, typeWrapper } from "next-utils";

const getHandler = get((req, res) => {
  res.status(200).json({ name: "Get" });
});

const postHandler = post(
  typeWrapper<{ t: string }, { t: number }>((req, res) => {
    res.status(200).json({ t: 2 });
  })
);

export default withMethod(getHandler, postHandler);
