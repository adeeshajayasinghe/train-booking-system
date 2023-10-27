const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Station } = require("../Models/Station");
const { Route } = require("../Models/Route");
const { Train,BookingHistory } = require("../Models/Train");

router.post("/", async (req, res) => {
    console.log(req.body);
    const { error } = validate(req.body);
 
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
        
    }


    // const routeNumbers = db.stations.find(
    //     { station: { $in: [routeFrom, routeTo] } },
    //     { route: 1 }
    //   ).toArray();

    // Get Route Numbers for From and To Stations
    const routeNumbers = await Station.find({
        station: { $in: [req.body.from, req.body.to] },
    });
    console.log(routeNumbers);
    // Get the class prices that belongs to origin and destination
    const originClassPrices = routeNumbers[0].prices;
    const destinationClassPrices = routeNumbers[1].prices;
    // Get the route that belongs to origin and destination
    const route = routeNumbers[0].route_id;
    console.log(route);
    // Fetch the route from the database
    // Calculate the prices of three classes
    const routeDetails = await Route.findOne({ routeNo: route });
    const firstClassPriceIndex = Math.abs(
        parseInt(routeDetails.prices[0].indexOf(destinationClassPrices[0])) -
        parseInt(routeDetails.prices[0].indexOf(originClassPrices[0]))
    );
    const secondClassPriceIndex = Math.abs(
        parseInt(routeDetails.prices[1].indexOf(destinationClassPrices[1])) -
        parseInt(routeDetails.prices[1].indexOf(originClassPrices[1]))
    );
    const thirdClassPriceIndex = Math.abs(
        parseInt(routeDetails.prices[2].indexOf(destinationClassPrices[2])) -
        parseInt(routeDetails.prices[2].indexOf(originClassPrices[2]))
    );
    const firstClassPrice = routeDetails.prices[0][firstClassPriceIndex];
    const secondClassPrice = routeDetails.prices[1][secondClassPriceIndex];
    const thirdClassPrice = routeDetails.prices[2][thirdClassPriceIndex];
    const classPrices = [firstClassPrice, secondClassPrice, thirdClassPrice];

    //new rule for colombo fort
    if (req.body.from === "Colombo Fort") {
        routeNumbers[0].route_id = routeNumbers[1].route_id;
    }

    //new rule for colombo fort
    if (req.body.to === "Colombo Fort") {
        routeNumbers[1].route_id = routeNumbers[0].route_id;
    }

    // Filter Trains by Route
    const trains = await Train.find({
        routes: { $all: [routeNumbers[0].route_id, routeNumbers[1].route_id] },
    });
    //console.log(routeNumbers[0].route_id, routeNumbers[1].route_id)
    //console.log(trains);
    const filteredTrains = trains.filter(
        (train) =>
            train.stations.includes(req.body.from) &&
            train.stations.includes(req.body.to)
    );

    //console.log(filteredTrains);
   
    // Filter Trains by Date and Type
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const inputDate = new Date(req.body.date);

    const dayName = dayNames[inputDate.getDay()];


    let filteredTrainsByDate = filteredTrains.filter((train) => {
      
        if (dayName === "Saturday" || dayName === "Sunday") {
            return train.dates.includes("Daily") || train.dates.includes("Weekends");
        } else {
            return train.dates.includes("Daily") || train.dates.includes("Weekdays");
        }
    });

    console.log(filteredTrainsByDate);

    filteredTrainsByDate = filteredTrainsByDate.filter((train) => {
        const originIndex = train.stations.indexOf(req.body.from);
        const destinationIndex = train.stations.indexOf(req.body.to);
        
        return originIndex < destinationIndex;
    });

    console.log(filteredTrainsByDate);
    
    //taking bookes seets from booking history
    const result = await BookingHistory.find({ date: req.body.date, Status: "Pending" }, { seat_numbers: 1, class: 1, _id: 0, trainName: 1 })
    console.log(result);

    const resultObject = {};  //to store the booking information of trains that have bookings for given date

    result.forEach(item => {
        const { trainName, class: className, seat_numbers } = item;

        if (!resultObject[trainName]) {
            resultObject[trainName] = [];
        }

        const classIndex = resultObject[trainName].findIndex(entry => entry[className]);

        if (classIndex === -1) {
            const classObject = {};
            classObject[className] = seat_numbers;
            resultObject[trainName].push(classObject);
        } else {
            resultObject[trainName][classIndex][className].push(...seat_numbers);
        }
    });

    console.log(resultObject);

    //modify the seatsArrangement array
    function modifySeatsArrangement(seatsArrangement, indexArray) {
        for (let k = 0; k < indexArray.length; k++) {
            let index_to_change = indexArray[k];
            //console.log(index_to_change);
            //console.log(seatsArrangement);
            seatsArrangement[index_to_change] = 1;
            //seatsArrangement[indexArray[k]] = 1;
            //console.log(seatsArrangement[index_to_change]);
        }
        return seatsArrangement;
    }

    //sometimes train will have only one class. if it is third class following code's indexes may be mis matched.
    //this method is to filter the right class name with the right class index
    function gettingIndex(classArray, class_name) {
        let index = 0;
        let length_of_classArray = classArray.length;
        if (length_of_classArray === 1) {
            index = 0;   
        } else {
             for (let i = 1;i<length_of_classArray;i++) {
                if (classArray[i] === class_name) {
                    index = i;
                }
        }
       
        }
        return index;
    }
    //this loop is for generate arrays with all 0s
    for (let i = 0; i < filteredTrainsByDate.length; i++) {
        console.log(filteredTrainsByDate[i].seatsAvailability); 
        filteredTrainsByDate[i].seatsAvailability.forEach((numberOfSeats) => {
            const zerosArray = Array.from({ length: numberOfSeats }, () => 0);
            //console.log(zerosArray);
            filteredTrainsByDate[i].seatsArrangement.push(zerosArray);
            //console.log(filteredTrainsByDate[i].seatsArrangement);
        });
       console.log(filteredTrainsByDate[i].seatsArrangement);
        const trainName_temp = filteredTrainsByDate[i].trainName;
        console.log(trainName_temp);
        
        if (resultObject[trainName_temp]) {
            const len = resultObject[trainName_temp].length;
            for (let j = 0; j < len; j++) { 
               
                const className = Object.keys(resultObject[trainName_temp][j]);
                //console.log(className[0]);
                const indexArray = resultObject[trainName_temp][j][className[0]];
                //console.log(indexArray);

                if (className[0] === "First Class") {
                    const index = gettingIndex(filteredTrainsByDate[i].seatsAvailability, "Second Class");
                    const seatView = filteredTrainsByDate[i].seatsArrangement[index];
                    const modifiedSeatView = modifySeatsArrangement(seatView, indexArray);
                    //console.log(modifiedSeatView);

                
                }
                else if (className[0] === "Second Class") {
                    const index = gettingIndex(filteredTrainsByDate[i].seatsAvailability, "Second Class");
                    const seatView = filteredTrainsByDate[i].seatsArrangement[index];
                    const modifiedSeatView = modifySeatsArrangement(seatView, indexArray);
                    //console.log(modifiedSeatView);

                
                } else if (className[0] === "Third Class") {
                    const index = gettingIndex(filteredTrainsByDate[i].seatsAvailability, "Third Class");
                    const seatView = filteredTrainsByDate[i].seatsArrangement[index];
                    console.log(seatView);
                    const modifiedSeatView = modifySeatsArrangement(seatView, indexArray);
                    //console.log(modifiedSeatView);
                }
            };
            
            
        } else {
            console.log(`No booking information found for train: ${trainName_temp}`);
        };
    
    };

    for (let i = 0; i < filteredTrainsByDate.length; i++) {
        console.log(filteredTrainsByDate[i].seatsArrangement);
    }

    //console.log(trainNameToIndex);

    //console.log(resultObject);
    
    console.log(filteredTrainsByDate);
    
    res.json([filteredTrainsByDate, classPrices]);
  
});

function validate(train) {
  const schema = Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required(),
    date: Joi.string()
      .required()
      .custom((value, helpers) => {
        const selectedDate = new Date(value);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
          return helpers.error('date.invalid');
        }

        return value;
      })
      .messages({
        'date.invalid': 'Please select a valid date',
    }),
    passengers: Joi.number().required()
    // returnDate: Joi.string().optional(),
  });
    return schema.validate(train);
}

module.exports = router;