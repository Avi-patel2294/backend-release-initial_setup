const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdvertzeSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Categories',
	},
	price: {
		type: String,
		required: true,
	},
	websiteLink: {
		type: String,
	},
	youtubeLink: {
		type: String,
	},
	location: {
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
		postal: {
			type: String,
		},
		country: {
			type: String,
		},
		lat: {
			type: Number,
		},
		lng: {
			type: Number,
		},
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	images: [
		{
			fileName: String,
			largeFile: String,
			thumbFile: String,
		},
	],
	vehicle: {
		year: String,
		make: String,
		model: String,
		bodyType: String,
		condition: String,
		miles: String,
		transmission: String,
		color: String,
		fuelType: String,
		noOfDoors: String,
		noOfSeats: String,
	},
	property: {
		bedRooms: String,
		BathRooms: String,
		Size: String,
		Furnished: String,
		Appliances: String,
		rentals: {
			unitType: String,
			AggrementType: String,
			MoveInDate: Date,
			PetFriendly: Boolean,
			OutDoorSpace: String,
			AirConditioning: Boolean,
			smokingPermited: Boolean,
			Parking: Number,
		},
	},
	job: {
		company: String,
		jobType: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Advertize', AdvertzeSchema);
