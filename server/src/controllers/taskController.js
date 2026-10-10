const Task = require('../models/Task');

const FIELDS = ['title', 'description', 'date', 'startTime', 'endTime', 'priority', 'status'];
const pick = (body) => Object.fromEntries(FIELDS.filter((k) => k in body).map((k) => [k, body[k]]));
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const notFound = () => Object.assign(new Error('Task not found'), { status: 404 });

// GET /api/tasks?search=keyword  (sorted by date, then start time)
exports.getTasks = async (req, res) => {
  const q = (req.query.search || '').trim();
  const filter = q
    ? { $or: [{ title: new RegExp(escapeRegex(q), 'i') }, { description: new RegExp(escapeRegex(q), 'i') }] }
    : {};
  res.json(await Task.find(filter).sort({ date: 1, startTime: 1 }));
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  res.status(201).json(await Task.create(pick(req.body)));
};

// PUT /api/tasks/:id  (also used for status toggle)
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw notFound();
  task.set(pick(req.body));
  task.markModified('endTime'); // re-run end-time vs start-time check
  res.json(await task.save());
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) throw notFound();
  res.status(204).end();
};