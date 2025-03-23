import { ENV } from "./config";
import axios from "axios";

const url = ENV.BACKEND_URL;

const handleDemo = async (form: any) => {
  try {
    const response = await axios.post(`${url}/demo/`);
    if (response.status === 200) {
    }
  } catch {}
};
export { handleDemo };
