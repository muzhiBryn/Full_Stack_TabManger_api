import Tab from '../models/tab_model';

export const createTab = (req) => {
  const { resource, parent } = req;
  const _tab = new Tab();
  _tab.url = resource.url;
  _tab.title = resource.title || '';
  _tab.tags = resource.tags || [];
  _tab.icon = resource.icon || '';
  _tab.parent = parent;
  console.log(_tab);
  return new Promise((resolve, reject) => {
    _tab.save()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTabs = (req) => {
  const { parent } = req;
  return new Promise((resolve, reject) => {
    Tab.find({ parent })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteTab = (req) => {
  const { parent, url } = req;
  return new Promise((resolve, reject) => {
    Tab.findOneAndDelete({ parent, url }, {useFindAndModify:false })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateTab = (req) => {
  const { resource, parent } = req;
  return new Promise((resolve, reject) => {
    Tab.findOneAndUpdate({ parent, url: resource.url }, resource, { new: true, useFindAndModify:false })
      .then((result) => {
        if (!result) {
          createTab({ resource, parent })
            .then((res) => {
              resolve(res);
            });
        } else {
          resolve(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
