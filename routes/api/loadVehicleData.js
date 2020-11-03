const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Cars = require('../../models/CarsModel');

const sequelize = new Sequelize('postgres', 'jaypatel', 'swami1203', {
	host: 'localhost',
	dialect: 'postgres',
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});

const car_makes = sequelize.define('car_makes', {
	make_id: {
		type: Sequelize.INTEGER,
	},
	make: {
		type: Sequelize.STRING,
	},
});

const car_models = sequelize.define('car_models', {
	model_id: {
		type: Sequelize.INTEGER,
	},
	model: {
		type: Sequelize.STRING,
	},
	make_id: {
		type: Sequelize.INTEGER,
	},
});

router.post('/loadvehicledata', async (req, res) => {
	let vehicle = {};
	// car_makes
	// 	.findAll({
	// 		attributes: ['make_id', 'make'],
	// 	})
	// 	.then((car_make) => {
	// 		car_make.map((make) => {
	// 			console.log(make.make);
	// 			car_models
	// 				.findAll({
	// 					attributes: ['model_id', 'model', 'make_id'],
	// 					where: {
	// 						make_id: make.make_id,
	// 					},
	// 				})
	// 				.then((car_model) => {
	// 					// console.log(car_model);
	// 					vehicle.push({
	// 						make: make.make,
	// 						model: car_model,
	// 					});
	// 				});
	// 		});
	// 		//res.json(make);
	// 	});

	const carMakes = await car_makes.findAll({
		attributes: ['make_id', 'make'],
	});

	for (let index = 0; index < carMakes.length; index++) {
		// if (carMakes[index].make_id === 58) {
		console.log(carMakes[index].make);
		const carModels = await car_models.findAll({
			attributes: ['model'],
			where: {
				make_id: carMakes[index].make_id,
			},
		});
		let models = [];
		for (let idx = 0; idx < carModels.length; idx++) {
			// console.log(carModels[idx].model);
			models.push(carModels[idx].model);
		}
		vehicle[carMakes[index].make] = models;
		// const newVehicle = await new Cars({
		// 	make: carMakes[index].make,
		// 	models: models,
		// }).save();
		// vehicle.push({
		// 	make: carMakes[index].make,
		// 	models: models,
		// });
	}
	// }

	res.json(vehicle);
	// res.json({
	// 	msg: 'vehicle data collecetd',
	// });
});

//Export the module
module.exports = router;
