const logger = require('../logger');
const Favourites = require('../models/FavouritesModel');

exports.default = {
	Mutation: {
		setFavourites: async (_root, { advertizeId }, { req, res }) => {
			if (!req.userId) {
				return false;
			}

			logger.info(
				`resovers:FavouritesResolver:setFavourites::advertizeId ${advertizeId} :: userId::${req.userId}`
			);

			await new Favourites({
				userId: req.userId,
				advertizeId: advertizeId,
			}).save();

			return true;
		},
		removeFavourites: async (_root, { favouritesId }, { req, res }) => {
			if (!req.userId) {
				return false;
			}

			logger.info(
				`resovers:FavouritesResolver:removeFavourites::favouriteId ${favouritesId} :: userId::${req.userId}`
			);

			await Favourites.findByIdAndRemove(favouritesId);

			return true;
		},
	},
};
