import Qualification from "../models/qualification.model.js";

// get all the Qualifications

export const getAllQualifications = async (req , res ) => {
    try {
        const qualifications = await Qualification.find();
        res.status(200).json (qualifications);
    }   catch (err) {
        res.status(500).json({message: "Error fetching qualifications", error: err});
    }
};

// get by ID
export const getQualificationById = async (req , res ) => {
    try {
        const qualification = await Qualification.findById(req.params.id);
        if (!qualification) return res.status(404).json ({ message: "Qualification not found"});
        res.status(200).json (qualification);
    }   catch (err) {
        res.status(500).json({message: "Error fetching qualification", error: err});
    }
};

// post new

export const createQualification = async (req, res) => {
    try {
        const newQualification = new Qualification (req.body);
        await newQualification.save();
        res.status(201).json(newQualification);
    }   catch (err) {
        res.status(400).json ({message: "Error creating qualification", error: err});
    }
};

//Put update

export const updateQualification = async (req , res ) => {
    try {
        const qualification = await Qualification.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!qualification) return res.status(404).json ({ message: "Qualification not found"});
        res.status(200).json (qualification);
    }   catch (err) {
        res.status(400).json({message: "Error updating qualification", error: err});
    }
};

// delete by id

export const deleteQualification = async (req , res ) => {
    try {
        const qualification = await Qualification.findByIdAndDelete(req.params.id);
        if (!qualification) return res.status(404).json ({ message: "Qualification not found"});
        res.status(200).json ({ message: "Qualification deleted"});
    }   catch (err) {
        res.status(500).json({message: "Error deleting qualification", error: err});
    }
};

// deletee all

export const deleteAllQualifications = async (req , res ) => {
    try {
        await Qualification.deleteMany({});
        res.status(200).json({ message: "All qualifications deleted"});
    }   catch (err) {
        res.status(500).json({message: "Error deleting all qualifications", error: err});
    }
};