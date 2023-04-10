import mongoose from "mongoose"
import User from "../../models/User.js"
import createToken from "../../helpers/createToken.js"
import createJWT from '../../helpers/createJWT.js'

const ObjectId = mongoose.Types.ObjectId;

const authenticate = async (req, res) => {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('User does not exist')
        return res.status(404).json({ msg: error.message })
    }
    // Check if user is confiremd
    if(!user.confirmed) {
        const error = new Error('You must confirm your account')
        return res.status(400).json({ msg: error.message })
    }
    /* Check if user account is disabled */
    if(user.disabled) {
        const error = new Error('This account is disabled')
        return res.status(403).json({ msg: error.message })
    }

    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: createJWT(user._id)
        })
    } else {
        const error = new Error('Incorrect password')
        return res.status(403).json({ msg: error.message })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({token})
    if(!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.confirmed = true
        user.token = ''
        user.save()
        res.json({ msg: 'User confirmed successfully'})
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('There is no registered user with that email')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.token = createToken()
        user.save()
        /* TODO: Importar nodemailer al proyecto y enviar email cuando el usuario resetee su password */
        res.json({ msg: 'Instructions have been sent to your email' })
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message })
    }
    res.json({ msg: 'Valid token' })
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message })
    }

    user.password = password
    user.token = ''
    try {
        await user.save()
        res.json({ msg: 'You have changed the password successfully' })
    } catch (error) {
        console.log(error)
    }
}

const profile = async (req, res) => {
    const { user } = req

    res.json(user)
}

const editProfile = async (req, res) => {
    const { name, email, password, userId } = req.body

    if (ObjectId.isValid(userId)) {
        const user = await User.findOne({ userId })
        if(!user) {
            return
        }

        if (String(name).length < 20) {
            try {
                user.name = name
                user.email = email
                user.password = password
                await user.save()
                res.json(user)
            } catch (error) {
                res.json({ msg: 'There was an error saving changes' })
            }

        }
    }
}

const disable = async (req, res) => {
    const { userId } = req.body

    if(ObjectId.isValid(userId)) {
        const user = await User.findOne({ userId })
        if(user) {
            console.log(user)
            user.disabled = true
            try {
                await user.save()
                res.json({ msg: 'You have successfully deactivated your account'})
            } catch (error) {
                console.log(error)
                res.json({ msg: 'There was a problem deactivating your account' })   
            }
        }
    }
}

export {
    authenticate,
    confirm,
    resetPassword,
    checkToken,
    newPassword,
    profile,
    editProfile,
    disable
}
