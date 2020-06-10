import mongoose, { Schema } from 'mongoose';

// create a ModelSchema with a title field
const TabSchema = new Schema({
// We can add authors (users) later if we want with this line:
//   author: { type: Schema.Types.ObjectId, ref: 'User' },
  url: {
    type: String,
    required: true,
  },
  parent: { type: Schema.Types.ObjectId, ref: 'Project' },
  title: String,
  tags: Array,
  icon: String,
  // To determine what order to display tabs; this can work as an upvote-esque feature
  priority: { type: Number, default: 0 },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create TabModel class from schema
const TabModel = mongoose.model('Tab', TabSchema);

export default TabModel;
