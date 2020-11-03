const Advertize = require('../../../models/AdvertizeModel');

const advertizements = async (_root, { first = 10, skip = 0 }) => {
	const count = await Advertize.find().count();
	const skipDocs = first * skip;
	const getAllAdvertize = await Advertize.find()
		.limit(first)
		.skip(skipDocs)
		.sort({
			createdDate: 'desc',
		});

	const pageCount = Math.ceil(count / first);
	return {
		advertizeData: getAllAdvertize,
		meta: {
			noOfPages: pageCount,
		},
	};
};

module.exports = advertizements;
