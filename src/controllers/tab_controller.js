import Tab from '../models/tab_model';

export const createTab = (req, res) => {
  const tab = new Tab();
  tab.title = req.body.title;
  tab.page_url = req.body.page_url;
  tab.tags = req.body.tabs;
  tab.image_url = req.body.image_url;
  tab.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      
      res.status(500).json({ error });
    });
};

export const getTabs = (req, res) => {
  Tab.find()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getTab = (req, res) => {
  Tab.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const deleteTab = (req, res) => {
  Tab.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const updateTab = (req, res) => {
  const fields = req.body;
  Tab.findByIdAndUpdate(req.params.id, fields, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};