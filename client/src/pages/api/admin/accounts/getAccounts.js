import axios from "axios";

export default async function handler(req, res) {
	const { config } = req.body;
	try {
        const { data } = await axios.request({
            method: 'GET',
            url: `${process.env.SERVER_URI}/v1/accounts`,
            headers: {
                'Authorization': config.headers.Authorization
            }
        }) 
		return res.status(200).json(data);
	} catch (error) {
        console.log(error.response.data.msg)
		const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}