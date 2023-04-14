import axios from "axios";

export default async function handler(req, res) {
	const { full_name, email, date, hour } = req.body;
	try {
        const { data } = await axios.request({
            url: `${process.env.SERVER_URI}/v1/videocall`,
            method: 'POST',
            data: { full_name, email, date, hour }
        })
		return res.status(200).json(data);
	} catch (error) {
		const resError = new Error(error.response.data.msg)
		console.log(resError)
        console.log(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}