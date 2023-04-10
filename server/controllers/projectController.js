import mongoose from "mongoose";
import Project from "../models/Project.js";

const ObjectId = mongoose.Types.ObjectId;
const getProject = async (req, res) => {
    
    const _id = req.body._id;

    if(!_id) {
        return res.status(404).json({ msg: 'Hay campos requeridos vacíos (_id)' })
    }

    if(!ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'id no válido' })
    }

    try {
        const project = await Project.findById(_id).select('-updatedAt -__v');
        return res.status(200).json(project);
    } catch (error) {
        return res.status(404).json({ msg: 'Hubo un error al obtener los proyectos' })
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().select('-updatedAt -__v');
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(404).json({ msg: 'Hubo un error al obtener los proyectos' })
    }
}

const createProject = async (req, res) => {
    const website_type = req.body.website_type;
    const contact_information = req.body.contact_information;
    const budget = req.body.budget;

    if(!website_type || !budget || !contact_information) {
        return res.status(406).json({ msg: 'Hay campos requeridos vacíos' });
    }

    if(website_type === 'website' || website_type === 'ecommerce' || website_type === 'app') {
        if(Object.keys(budget).length === 0) {
            return res.status(406).json({ msg: "'bugdet' debe ser un objecto { from, to }" });
        }

        if(!budget?.from || !budget?.to) {
            return res.status(406).json({ msg: "'bugdet' debe ser un objecto { from, to }" });
        }
    
        if(!contact_information?.full_name || !contact_information?.email) {
            return res.status(406).json({ msg: "'contact_information' debe ser un objecto { full_name, email, phone_number, country }" });
        }
    
        try {
            const newProject = new Project(req.body);
            await newProject.save();
            return res.status(200).json({ msg: "Hemos recibido los datos de tu proyecto" });
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error al enviar los datos de tu proyecto" });
        }
    } else {
        return res.status(406).json({ msg: "'website_type' debe ser 'website' o 'ecommerce' o 'app'" }); 
    }
}

const changeProjectState = async (req, res) => {
    const projectId = req.body._id;
    const newState = req.body.state;

    // Check if project ID is valid
    if(!ObjectId.isValid(projectId)) {
        return res.status(406).json({ msg: 'El id del proyecto no es válido' });
    }

    if(!newState) {
        return res.status(406).json({ msg: 'Hay campos requeridos vacíos (state)' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if(!project) {
        return res.status(404).json({ msg: 'Este proyecto no existe' });
    }

    try {
        project.state = newState;
        project.save();
        return res.status(200).json({ msg: 'Cambiaste el estado del proyecto correctamente' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al cambiar el estado del proyecto' });
    }
}

const cancelProject = async (req, res) => {
    const projectId = req.body._id;

    if(req.user.permissions !== 'superadmin') {
        return res.status(406).json({ msg: 'Permisos insuficientes' });
    }

    // Check if project ID is valid
    if(!ObjectId.isValid(projectId)) {
        return res.status(406).json({ msg: 'El id del proyecto no es válido' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if(!project) {
        return res.status(404).json({ msg: 'Este proyecto no existe' });
    }

    try {
        project.state = 'cancelled';
        project.save();
        return res.status(200).json({ msg: 'Cancelaste el proyecto' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al cambiar el estado del proyecto' });
    }
}

export {
    getProject,
    getProjects,
    createProject,
    changeProjectState,
    cancelProject
}