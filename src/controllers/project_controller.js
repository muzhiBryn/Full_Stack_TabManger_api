import Project from '../models/project_model';

export const createProject = (req, res) => {
  const project = new Project();
  project.title = req.body.title;
  project.tabs = req.body.tabs
  project.notes = req.body.notes;
  project.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      
      res.status(500).json({ error });
    });
};

export const getProjects = (req, res) => {
  Project.find()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getTab = (req, res) => {
  Project.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const deleteProject = (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const updateProject = (req, res) => {
  const fields = req.body;
  Project.findByIdAndUpdate(req.params.id, fields, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};