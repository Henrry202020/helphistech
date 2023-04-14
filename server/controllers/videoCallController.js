import VideoCall from "../models/VideoCall.js";

/**
 * Create video call
 */ 
async function createVideoCall(req, res) {
    const full_name = req.body.full_name;
    const email = req.body.email;
    const date = req.body.date;
    const hour = req.body.hour;

    if([full_name, email, date, hour].includes('')) {
        return res.status(400).json({ msg: 'All fields are required. (full_name, email, platform, date, hour, timezone)' })
    }

    if(typeof hour != 'string' || typeof email != 'string' || typeof full_name != 'string') {
        return res.status(400).json({ msg: 'All fields must be type string' })
    }

    try {
        const newVideoCall = new VideoCall({full_name, email, date, hour});
        await newVideoCall.save();
        return res.status(200).json({ msg: 'ok' })
    } catch (error) {
        return res.status(400).json({ msg: 'There was an error scheduling your video call' })
    }
}

export {
    createVideoCall
}