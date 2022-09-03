import { get, post, withMethod, typeWrapper } from "nextjs-utilities";

interface RequestBody {
  name: string;
}

interface ResponseBody {
  id: number;
  logged_in: boolean;
}

const getHandler = get((req, res) => {
  res.status(200).json({ name: "Get" });
});

const postHandler = post(
  typeWrapper<RequestBody, ResponseBody>((req, res) => {
    res.status(200).json({ id: 1, logged_in: true });
  })
);

export default withMethod(getHandler, postHandler);
