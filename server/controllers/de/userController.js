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
        const error = new Error('Benutzer existiert nicht')
        return res.status(404).json({ msg: error.message })
    }
    // Check if user is confiremd
    if(!user.confirmed) {
        const error = new Error('Sie müssen Ihr Konto bestätigen')
        return res.status(400).json({ msg: error.message })
    }
    /* Check if user account is disabled */
    if(user.disabled) {
        const error = new Error('Dieses Konto ist deaktiviert')
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
        const error = new Error('Falsches Passwort')
        return res.status(403).json({ msg: error.message })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({token})
    if(!user) {
        const error = new Error('Ungültiges Authentifizierungstoken')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.confirmed = true
        user.token = ''
        user.save()
        return res.json({ msg: 'Benutzer erfolgreich verifiziert'})
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('Es gibt keinen registrierten Benutzer mit dieser E-Mail')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.token = createToken()
        user.save()
        /* TODO: Importar nodemailer al proyecto y enviar email cuando el usuario resetee su password */
        return res.json({ msg: 'Anweisungen wurden an Ihre E-Mail gesendet' })
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Ungültiges Authentifizierungstoken')
        return res.status(404).json({ msg: error.message })
    }
    return res.json({ msg: 'Gültiges Authentifizierungstoken' })
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Ungültiges Authentifizierungstoken')
        return res.status(404).json({ msg: error.message })
    }

    user.password = password
    user.token = ''
    try {
        await user.save()
        return res.json({ msg: 'Sie haben das Passwort erfolgreich geändert' })
    } catch (error) {
        console.log(error)
    }
}

const profile = async (req, res) => {
    const { user } = req

    return res.json(user)
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
                return res.json(user)
            } catch (error) {
                return res.json({ msg: 'Beim Speichern der Änderungen ist ein Fehler aufgetreten' })
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
                return res.json({ msg: 'Sie haben Ihr Konto erfolgreich deaktiviert'})
            } catch (error) {
                console.log(error)
                return res.json({ msg: 'Beim Deaktivieren Ihres Kontos ist ein Problem aufgetreten' })   
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
