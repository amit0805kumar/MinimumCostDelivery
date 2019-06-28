const express = require('express');
const data = require('./data.json');
const {
    check,
    validationResult
} = require('express-validator');
//const mongoose = require('mongoose');


const app = express();

//const mongoUI = "mongodb+srv://amit:amit@assignment-ixcpu.mongodb.net/test?retryWrites=true&w=majority";

/*
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
*/

//connectDb();
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json({
    extended: false
}));

app.post('/', async (req, res) => {
    try {

        const {
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H,
            I
        } = req.body;

        const {
            weight,
            minDistance
        } = data;

        const input = {}
        if (A) input.A = A;
        if (B) input.B = B;
        if (C) input.C = C;
        if (D) input.D = D;
        if (E) input.E = E;
        if (F) input.F = F;
        if (G) input.G = G;
        if (H) input.H = H;
        if (I) input.I = I;

        let activeSpot = {
            "C1": false,
            "C2": false,
            "C3": false
        }

        if (A || B || C) activeSpot.C1 = true;
        if (D || E || F) activeSpot.C2 = true;
        if (G || H || I) activeSpot.C3 = true;

        let cost = 0;

        if (activeSpot.C1 && !activeSpot.C2 && !activeSpot.C3) {
            cost = minDistance.C1.L1;
        } else if (!activeSpot.C1 && activeSpot.C2 && !activeSpot.C3) {
            cost = minDistance.C2.L1;
        } else if (!activeSpot.C1 && !activeSpot.C2 && activeSpot.C3) {
            cost = minDistance.C3.L1;
        } else if (activeSpot.C1 && activeSpot.C2 && !activeSpot.C3) {
           
            
        } else if (activeSpot.C1 && !activeSpot.C2 && activeSpot.C3) {
            
            
        } else if (!activeSpot.C1 && activeSpot.C2 && activeSpot.C3) {
           
            
        } else if (!activeSpot.C1 && !activeSpot.C2 && activeSpot.C3) {
            
            
        }


        res.json({
            cost: cost
        });
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
