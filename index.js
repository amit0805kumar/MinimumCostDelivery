const express = require('express');
const data = require('./data.json');
//const {
//    check,
//    validationResult
//} = require('express-validator');



const app = express();

//app.use(express.urlencoded({
//    extended: false
//}));
app.use(express.json({
    extended: false
}));

app.post('/app', async (req, res) => {
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

        const itemArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];


        const {
            weight,
            minDistance
        } = data;
        let totalWeight = 0;


        itemArray.map(item => {
            if (req.body[item]) {
                totalWeight += (weight[item] * req.body[item]);
            }
        });
    
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

            cost += ((parseInt((totalWeight - 5) / 5)) * 8 * lenght);

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
//    console.log(`Server started on ${PORT}`);
});
