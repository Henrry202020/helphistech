import axios from "axios";

export default async function handler(req, res) {
	const { name, email, password, config } = req.body;
	try {
        const { data } = await axios.request({
            method: 'POST',
            url: `${process.env.SERVER_URI}/v1/accounts`,
            headers: {
                'Authorization': config.headers.Authorization
            },
            data: { name, email, password }
        }) 
		return res.status(200).json(data);
	} catch (error) {
		const resError = new Error(error.response.data.msg)
		return res.status(400).json({ msg: resError.message });
	}
}