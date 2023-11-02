const yup = require('yup');
const Todo = require('../models/TodoModel');

const todoSchema = yup.object().shape({
  text: yup.string().required(),
  isCompleted: yup.boolean().required(),
});

const createTodo = async (req, res) => {
  try {
    const { text, isCompleted } = req.body;

    await todoSchema.validate({ text, isCompleted });

    const todo = await Todo.create({ text, isCompleted });

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTodos = async (req, res) => {
  const todos = await Todo.findAll({
    attributes: ['id', 'text', 'isCompleted'],
  });
  res.json({ todos });
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id, {
    attributes: ['id', 'text', 'isCompleted'],
  });

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, isCompleted } = req.body;

  await todoSchema.validate({ text, isCompleted });

  const todo = await Todo.findByPk(id, {
    attributes: ['id', 'text', 'isCompleted'],
  });
  if (todo) {
    todo.text = text;
    todo.isCompleted = isCompleted;
    await todo.save();
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id, {
    attributes: ['id', 'text', 'isCompleted'],
  });

  if (todo) {
    await todo.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
