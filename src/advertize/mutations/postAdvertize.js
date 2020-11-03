const Advertize = require('../../../models/AdvertizeModel');
const logger = require('../../../logger');
const suglify = require('../../../utils/suglify');

const postAdvertize = async (_root, { advertizeData }, { req }) => {
	if (!req.session.userId) {
		logger.error(
			'src:advertize:mutations:postAdvertize::User Not Authenticated'
		);
		throw new Error('UnAuthorized User');
	}

	logger.info(
		`resolver:Advertize: postAdvertize:: advertizeData`,
		advertizeData
	);
	// TODO: Add Yup Validation if data recived is correct or not
	// try {
	// 	logger.info(
	// 		'resolver:Advertize: postAdvertize:: Validating advertizeData '
	// 	);
	// 	await postAdvertizeSchema.validate(advertizeData);
	// } catch (err) {
	// 	logger.error(
	// 		'resolver:Advertize: postAdvertize:: Validating advertizeData Schema error',
	// 		err
	// 	);
	// 	throw new Error(err);
	// }

	if (advertizeData._id) {
		logger.info(
			'resolver:Advertize: postAdvertize:: found Id of the Advertize',
			advertizeData.id
		);
	} else {
		logger.info('resolver:Advertize: postAdvertize:: Post new advertize');
		const newAdvertize = await new Advertize({
			...advertizeData,
			slug: suglify(advertizeData.title),
			user: req.session.userId,
		}).save();
		logger.info(
			'resolver:Advertize: postAdvertize:: New advertize Data',
			newAdvertize
		);
	}

	// if (id) {
	// 	const updateAdvertize = await Advertize.findByIdAndUpdate(id, {
	// 		title: title,
	// 		description: description,
	// 		category: category,
	// 		for_sale_by: for_sale_by,
	// 		ads_type: ads_type,
	// 		price: price,
	// 		website_link: website_link,
	// 		youtube_link: youtube_link,
	// 		location: location,
	// 		user: user,
	// 		email: email,
	// 		phone: phone,
	// 		contact_person: contact_person
	// 	});
	// 	return updateAdvertize;
	// } else {
	// const newAdvertize = await new Advertize({
	//   title: title,
	//   description: description,
	//   category: category,
	//   for_sale_by: for_sale_by,
	//   ads_type: ads_type,
	//   price: price,
	//   website_link: website_link,
	//   youtube_link: youtube_link,
	//   location: location,
	//   user: user,
	//   email: email,
	//   phone: phone,
	//   images: images,
	//   contact_person: contact_person
	// }).save();
	// return newAdvertize;

	return 'Add Advertize Called';
	//	}
};
module.exports = postAdvertize;
