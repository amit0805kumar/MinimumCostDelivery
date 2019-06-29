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
        let totalWeight = 0;

        if (A) {

            totalWeight += (weight.A * A);
        }
        if (B) {

            totalWeight += (weight.B * B);
        }
        if (C) {

            totalWeight += (weight.C * C);
        }
        if (D) {

            totalWeight += (weight.D * D);
        }
        if (E) {

            totalWeight += (weight.E * E);
        }
        if (F) {

            totalWeight += (weight.F * F);
        }
        if (G) {

            totalWeight += (weight.G * G);
        }
        if (H) {

            totalWeight += (weight.H * H);
        }
        if (I) {

            totalWeight += (weight.I * I);
        }

        let activeSpot = {
            "C1": false,
            "C2": false,
            "C3": false
        }

        if (A || B || C) activeSpot.C1 = true;
        if (D || E || F) activeSpot.C2 = true;
        if (G || H || I) activeSpot.C3 = true;

        let lenght = 0;

        if (activeSpot.C1 && !activeSpot.C2 && !activeSpot.C3) {
            lenght = minDistance.C1.L1;
        } else if (!activeSpot.C1 && activeSpot.C2 && !activeSpot.C3) {
            lenght = minDistance.C2.L1;
        } else if (!activeSpot.C1 && !activeSpot.C2 && activeSpot.C3) {
            lenght = minDistance.C3.L1;
        } else if (activeSpot.C1 && activeSpot.C2 && !activeSpot.C3) {
            lenght = minDistance.C1.C2 + minDistance.C2.L1;
        } else if (activeSpot.C1 && !activeSpot.C2 && activeSpot.C3) {
            lenght = minDistance.C1.L1 + minDistance.L1.C3 + minDistance.C3.L1;
        } else if (!activeSpot.C1 && activeSpot.C2 && activeSpot.C3) {
            lenght = minDistance.C2.C3 + minDistance.C3.L1;
        } else if (activeSpot.C1 && activeSpot.C2 && activeSpot.C3) {
            lenght = minDistance.C1.C2 + minDistance.C2.C3 + minDistance.C3.L1;
        }


        let cost = 0;
        if (totalWeight <= 5) {
            cost = 10 * lenght;
        } else {
            cost = 10 * lenght;
            console.log(cost);
            
            cost += ((parseInt((totalWeight - 5)/5)) * 8 * lenght);
          
        }


        res.json({
            weight: totalWeight,
            dist: lenght,
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
