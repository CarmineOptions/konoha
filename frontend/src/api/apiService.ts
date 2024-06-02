import axios from "axios";
import { BASE_API_URL } from "../constants/amm";

type CommentPayload = {
	address: string;
	text: string;
};

export const submitCommentApi = async (payload: CommentPayload) => {
	const { data } = await axios.post(`${BASE_API_URL}/submit`, payload);
	return data;
};
