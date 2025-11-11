import Project from "../models/project.model.js";

// get all the Projects

export const getAllProjects = async (req , res ) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    }   catch (err) {
        res.status(500).json({message: "Error fetching projects", error: err});
    }
};

// get by ID
export const getProjectById = async (req , res ) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json ({ message: "Project not found"});
        res.status(200).json (project);
    }   catch (err) {
        res.status(500).json({message: "Error fetching project", error: err});
    }
};

// post new

export const createProject = async (req, res) => {
  try {
    const { title, description, firstname, lastname, email } = req.body;

    if (!title || !description || !firstname || !lastname || !email) {
      return res.status(400).json({
        message: "All fields (title, description, firstname, lastname, email) are required.",
      });
    }

    const newProject = new Project({
      title,
      description,
      firstname,
      lastname,
      email,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: "Error creating project", error: err.message });
  }
};


//Put update

export const updateProject = async (req , res ) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!project) return res.status(404).json ({ message: "Project not found"});
        res.status(200).json (project);
    }   catch (err) {
        res.status(400).json({message: "Error updating project", error: err});
    }
};

// delete by id

export const deleteProject = async (req , res ) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json ({ message: "Project not found"});
        res.status(200).json ({ message: "Project deleted"});
    }   catch (err) {
        res.status(500).json({message: "Error deleting project", error: err});
    }
};

// deletee all

export const deleteAllProjects = async (req , res ) => {
    try {
        await Project.deleteMany({});
        res.status(200).json({ message: "All projects deleted"});
    }   catch (err) {
        res.status(500).json({message: "Error deleting all projects", error: err});
    }
};
