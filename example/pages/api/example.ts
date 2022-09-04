import { catcher, get, post, withMethod, wrapper } from "nextjs-utilities";

interface RequestBody {
  name: string;
}

interface ResponseBody {
  id: number;
  logged_in: boolean;
}

const getHandler = get(
  catcher((req, res) => {
    throw new Error("This is an error");
    res.status(200).json({ name: "Get" });
  })
);

const postHandler = post(
  wrapper<RequestBody, ResponseBody>((req, res) => {
    res.status(200).json({ id: 1, logged_in: true });
  })
);

export default withMethod(getHandler, postHandler);
