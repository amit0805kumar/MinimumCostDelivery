const express = require('express');
const mongoose = require('mongoose');


const app = express();

const mongoUI = "mongodb+srv://amit:amit@assignment-ixcpu.mongodb.net/test?retryWrites=true&w=majority";

const connectDb = async () => {
    try {
        await mongoose.connect(mongoUI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDb connected...");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

connectDb();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API Running');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

