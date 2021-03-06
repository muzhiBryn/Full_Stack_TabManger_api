import mongoose, { Schema } from 'mongoose';
// import Tab from './tab_model';

// create a ModelSchema with a projectName field
const ProjectSchema = new Schema({
// We can add authors (users) later if we want with this line:
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  projectName: String,
  note: String,
  // tabs: Array,
  // To determine what order to display tabs; this can work as an upvote-esque feature
  priority: { type: Number, default: 0 },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create TabModel class from schema
const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;
