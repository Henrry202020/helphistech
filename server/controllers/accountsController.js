import User from "../models/User.js"

const getAccounts = async (req, res) => {
    try {
        const accounts = await User.find();
        return res.status(200).json(accounts);
    } catch (error) {
        return res.status(404).json({ msg: 'Hubo un error al obtener las cuentas' });
    }
}

/**
 * @required _id
*/
const getAccount = async (req, res) => {
    const accountId = req.body._id;

    try {
        const account = await User.findById(accountId);
        return res.status(200).json(account);
    } catch (error) {
        return res.status(404).json({ msg: 'Hubo un error al obtener las cuentas' });
    }
}

/**
 * @required name
 * @required email
 * @required password
 * @required permissions
*/
const modifyAccount = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const permissions = req.body.permissions;

    if([name, email, password, permissions].includes('')) {
        return res.status(400).json({ msg: 'Hay campos obligatorios vacíos' })
    }

    const account = await User.findOne({ email });
    if(!account) {
        return res.status(404).json({ msg: 'Esta cuenta no existe' });
    }

    try {
        account.name = name;
        account.email = email;
        account.password = password;
        account.permissions = permissions;
        account.save();
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al modificar la cuenta' });
    }
}

/**
 * @required name
 * @required email
 * @required password
*/
const register = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if([name, email, password].includes('')) {
        return res.status(400).json({ msg: 'Hay campos obligatorios vacíos' })
    }

    const emailExist = await User.findOne({ email })
    if(emailExist) {
        const error = new Error('Ya hay una cuenta registrada con este correo electrónico')
        return res.status(400).json({ msg: error.message })
    }

    try {
        const user = new User(req.body)
        /* user.token = createToken() */
        await user.save()
        res.status(200).json({ msg: 'Usuario registrado correctamente' })
    } catch (error) {
        console.log(error)
    }
}

export { 
    getAccounts,
    getAccount,
    modifyAccount,
    register 
}