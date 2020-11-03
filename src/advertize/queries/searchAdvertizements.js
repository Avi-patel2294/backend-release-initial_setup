const Advertize = require('../../../models/AdvertizeModel');
const logger = require('../../../logger');

const searchAdvertizements = async (root, { keywords, category, location }) => {
	const searchAdvertize = await Advertize.find(
		{
			$text: {
				$search: keywords,
			},
		},
		{
			score: {
				$meta: 'textScore',
			},
		}
	).sort({
		score: { $meta: 'textScore' },
	});
	return searchAdvertize;
};

module.exports = searchAdvertizements;
