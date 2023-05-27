const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://Rehnuma11:1212@cluster0.mkx69tw.mongodb.net/CalcultorTask?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));



  //cors
//middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));


// Define Calculation schema
const calculationSchema = new mongoose.Schema({
  expression: String,
  result: Number,
  text:String
});

const Calculation = mongoose.model('Calculation', calculationSchema);

// Routes
app.use(express.json());

// Get all calculations
app.get('/api/calculations', async (req, res) => {
  try {
    const calculations = await Calculation.find();
    res.json(calculations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve calculations' });
  }
});

// Add a new calculation
app.post('/api/calculations', async (req, res) => {
  const { expression, result ,text} = req.body;
  try {
    const calculation = new Calculation({ expression, result ,text});
    await calculation.save();
    res.json(calculation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save calculation' });
  }
});

// Delete a calculation
app.delete('/api/calculations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const calculation = await Calculation.findByIdAndDelete(id);
    res.json(calculation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete calculation' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
