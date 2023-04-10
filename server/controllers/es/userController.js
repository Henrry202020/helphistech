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
        const error = new Error('Este usuario no existe')
        return res.status(404).json({ msg: error.message })
    }
    // Check if user is confiremd
    if(!user.confirmed) {
        const error = new Error('Debes confirmar tu cuenta')
        return res.status(400).json({ msg: error.message })
    }
    /* Check if user account is disabled */
    if(user.disabled) {
        const error = new Error('Esta cuenta se encuentra deshabilitada')
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
        const error = new Error('Contraseña incorrecta')
        return res.status(403).json({ msg: error.message })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({token})
    if(!user) {
        const error = new Error('Este token no es válido')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.confirmed = true
        user.token = ''
        user.save()
        res.json({ msg: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('No hay ningún usuario registrado con este correo electrónico')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.token = createToken()
        user.save()
        /* TODO: Importar nodemailer al proyecto y enviar email cuando el usuario resetee su password */
        res.json({ msg: 'Se enviaron instrucciones a tu correo electrónico' })
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Este token no es válido')
        return res.status(404).json({ msg: error.message })
    }
    res.json({ msg: 'Token váldio' })
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Este token no es válido')
        return res.status(404).json({ msg: error.message })
    }

    user.password = password
    user.token = ''
    try {
        await user.save()
        res.json({ msg: 'Cambiaste tu contraseña correctamente' })
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
                res.json({ msg: 'Hubo un error al guardar los cambios' })
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
                res.json({ msg: 'Has desactivado tu cuenta'})
            } catch (error) {
                console.log(error)
                res.json({ msg: 'Hubo un problema al desactivar tu cuenta' })   
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
