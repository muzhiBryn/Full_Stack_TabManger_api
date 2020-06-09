import Project from '../models/project_model';
import * as Tabs from './tab_controller';

export const getProjects = (req, res) => {
  const user = req.user.id;
  Project.find({user})
    .then((results) => {
      res.json(results.map((result) => { return (result.projectName); }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createProject = (req, res) => {
  project.user = req.user.id;
  const project = new Project();
  project.projectName = req.body.projectName;
  project.user = req.user.id;
  project.save()
    .then(() => {
      getProjects(req, res);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getProject = (req, res) => {
  const { projectName } = req.params;
  const user = req.user.id;
  Project.findOne({ projectName, user })
    .then((result) => {
      console.log(result);
      const project = { projectName, projectNote: result.note, resources: {} };
      Tabs.getTabs({ parent: result.id }).then((tabs) => {
        tabs.forEach((tab) => {
          project.resources[tab.url] = {
            url: tab.url,
            title: tab.title,
            icon: tab.icon,
            tags: tab.tags,
          };
        });
        console.log(project);
        res.json(project);
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// export const getTab = (req, res) => {
//   Project.findById(req.params.id)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };

export const deleteProject = (req, res) => {
  const user = req.user.id;
  Project.findOneAndDelete({ projectName: req.params.projectName, user })
    .then(() => {
      Project.find()
        .then((results) => {
          res.json(results.map((result) => { return (result.projectName); }));
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const mergeProjects = async (req, res) => {
  let flag = 1;
  const user = req.user.id;
  await req.body.forEach((project) => {
    Project.findOne({ projectName: project.projectName, user })
      .then((result) => {
        if (!result) {
          const _project = new Project();
          _project.projectName = project.projectName;
          _project.note = project.projectNote;
          _project.user = user;
          _project.tabs = [];
          Object.values(project.resources).forEach((resource) => {
            Tabs.createTab({ resource, parent: project.projectName }).then((updatedTab) => {
              // console.log(updatedTab);
            });
          });
          _project.save();
        } else {
          result.note = result.note || project.projectNote;
          Object.values(project.resources).forEach((resource) => {
            Tabs.updateTab({ resource, parent: project.projectName }).then((updatedTab) => {
              // console.log(updatedTab);
            });
          });
          result.save();
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
        flag = 0;
      });
  });
  if (!req.body.length || flag)res.send({ msg: 'Success!' });
};

export const updateProject = (req, res) => {
  const { projectName, projectNote } = req.body;
  const user = req.user.id;
  Project.findOneAndUpdate({ projectName: req.params.projectName, user }, { projectName, note: projectNote }, { new: true })
    .then((curProj) => {
      const currentProject = {
        projectName: curProj.projectName,
        projectNote: curProj.note,
      };
      Tabs.getTabs({ parent: curProj.id }).then((tabs) => {
        currentProject.resources = {};
        tabs.forEach((tab) => {
          currentProject.resources[tab.url] = {
            url: tab.url,
            title: tab.title,
            icon: tab.icon,
            tags: tab.tags,
          };
        });
        Project.find()
          .then((projects) => {
            res.json({ currentProject, projectList: projects.map((proj) => { return (proj.projectName); }) });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteResources = (req, res) => {
  const { projectName } = req.params;
  const urls = req.body;
  const user = req.user.id;
  Project.findOne({ projectName, user }).then((project) => {
    // eslint-disable-next-line no-restricted-syntax
    urls.forEach((url) => {
      // eslint-disable-next-line no-await-in-loop
      Tabs.deleteTab({ parent: project.id, url }).then(() => {
        console.log(`Successfully deleted ${url}`);
      });
    });
    getProject(req, res);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const newResources = (req, res) => {
  const { projectName } = req.params;
  const resources = req.body;
  const user = req.user.id;
  Project.findOne({ projectName, user }).then((project) => {
    Object.values(resources).forEach((resource) => {
      Tabs.createTab({ resource, parent: project.id }).then((newTab) => {
        // console.log(newTab);
        Tabs.getTabs({ parent: project.id }).then((tabs) => {
          const _project = { projectName: project.projectName, projectNote: project.note };
          _project.resources = {};
          tabs.forEach((tab) => {
            _project.resources[tab.url] = {
              url: tab.url,
              title: tab.title,
              icon: tab.icon,
              tags: tab.tags,
            };
          });
          res.json(_project);
        });
      });
    });
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

export const updateResource = (req, res) => {
  const user = req.user.id;
  const { projectName } = req.params;
  const updatedResource = req.body;
  Project.findOne({ projectName, user }).then((project) => {
    Tabs.updateTab({ fields: updatedResource, parent: project.id }).then((updatedTab) => {
      console.log(updatedTab);
      res.json(updatedTab);
    });
  }).catch((error) => {
    res.status(500).json({ error });
  });
};
