const Advertize = require('../../../models/AdvertizeModel');

const getAllAdvertizements = async () => {
	const getAllAdvertize = await Advertize.find().sort({
		createdDate: 'desc',
	});
	// .populate('user');
	// console.log(getAllAdvertize);
	return getAllAdvertize;
};

module.exports = getAllAdvertizements;
