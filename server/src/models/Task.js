const mongoose = require('mongoose');

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 120 },
    description: { type: String, trim: true, default: '' },
    date: {
      type: String,
      required: [true, 'Date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      match: [TIME, 'Start time must be HH:mm'],
    },
    endTime: {
      type: String,
      default: '',
      validate: {
        validator(v) {
          return !v || (TIME.test(v) && v > this.startTime);
        },
        message: 'End time must be after start time',
      },
    },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);