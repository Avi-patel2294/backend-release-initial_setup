const Categories = require('../models/CategoriesModel');
const logger = require('../logger');
exports.default = {
	Query: {
		getCategories: async (root, args) => {
			const getCategories = await Categories.find({
				parent: null,
			}).sort({ name: 'asc' });

			const withSubCategories = getCategories.map(async (category) => {
				const subCategories = await Categories.find({
					parent: category.id,
				}).sort({ name: 'asc' });
				logger.info(`Parent Sub Category count: ${subCategories.length}`);
				category.subCategories = subCategories.map(async (cat) => {
					const subCategory = await Categories.find({
						parent: cat.id,
					}).sort({ name: 'asc' });
					cat.subCategories = subCategory.map(async (cat) => {
						const subCategory = await Categories.find({
							parent: cat.id,
						}).sort({ name: 'asc' });
						cat.subCategories = subCategory;
						return cat;
					});
					return cat;
				});
				return category;
			});

			return withSubCategories;
		},
		getCategoryTree: async (root, { categoryId }) => {
			logger.info(
				`resolver:CategoriesResolver::getCategoryTree:: categoryId:: ${categoryId}`
			);
			const category = await Categories.findById(categoryId).populate({
				path: 'parent',
				populate: { path: 'parent' },
			});
			return category;
		},
		getParentCategories: async (root, args) => {
			const getCategories = await Categories.find({
				parent: null,
			}).sort({ name: 'asc' });
			return getCategories;
		},
		getSubCategories: async (root, { parentId }) => {
			const getCategories = await Categories.find({
				parent: parentId,
			}).sort({ name: 'asc' });
			return getCategories;
		},
	},
	Mutation: {
		addCategory: async (root, { name, description, parent }) => {
			const category = await Categories.findOne({ name });

			if (category) {
				throw new Error('Category alredy exists!');
			}
			const newCategory = await new Categories({
				name: name,
				description: description,
				parent: parent,
			}).save();
			return newCategory;
		},
	},
};
