const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const session = require('express-session');
const dotenv = require('dotenv');
const connectRedis = require('connect-redis');
const {
	fileLoader,
	mergeTypes,
	mergeResolvers,
} = require('merge-graphql-schemas');
const logger = require('./logger');
const redis = require('./redis');
const { redisSessionPrefix } = require('./contstant');
const DBConnection = require('./service/DBConnection');
const isAuth = require('./middleware/isAuth');
const refreshToken = require('./src/api/refreshToken');

const RedisStore = connectRedis(session);
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
	fileLoader(path.join(__dirname, './resolvers'))
);

dotenv.config({ path: './.env' });

const limitter = rateLimit({
	max: 300,
	windowMs: 15 * 60 * 1000,
	message: 'Too many request from this IP, please try again in an hour',
});

(async () => {
	await DBConnection();

	const app = express();
	app.use(limitter);
	app.use(helmet());
	app.use(mongoSanitize());
	app.use(xss());

	const corsOptions = {
		origin: 'http://localhost:3000',
		credentials: true,
	};

	app.use(cors(corsOptions));
	app.use(
		session({
			store: new RedisStore({
				client: redis,
				prefix: redisSessionPrefix,
			}),
			name: 'adactoid',
			secret: process.env.ACCESS_TOKEN_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 31556952000,
			},
		})
	);
	app.use(cookieParser());
	app.use(isAuth);
	app.use(bodyParser.json());

	app.post('/api/refreshToken', refreshToken);
	const PORT = process.env.PORT || 4000;

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req, res }) => ({ req, res }),
	});
	server.applyMiddleware({ app, cors: corsOptions });

	app.listen(PORT, () => {
		logger.info(
			`Server listining on  && graphql at http://localhost:${PORT}${server.graphqlPath}`
		);
	});
})();
