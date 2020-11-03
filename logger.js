const path = require('path');
const fs = require('fs');
const httpContext = require('express-http-context');
const { createLogger, format, transports } = require('winston');

const fileName = 'backendapi';

const { combine, timestamp, printf, metadata, align } = format;
//directory where all logs files get saved
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const logFormat = printf((info) => {
	const reqId = httpContext.get('reqId');
	const message = reqId ? `${info.message}` : info.message;
	let meta = info.metadata ? `${JSON.stringify(info.metadata)}` : '';
	if (meta === {}) {
		meta = '';
	}
	return `${info.timestamp} ${info.level} ${message} ${meta}`;
});

const combinedFormat = combine(metadata(), align(), timestamp(), logFormat);

const transport = new transports.File({
	filename: path.join(logDir, `/${fileName}.log`),
	maxsize: '10000000',
	maxFiles: 3,
});

const logger = createLogger({
	level: 'info',
	format: combinedFormat,
	transports: [transport],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: combinedFormat,
		})
	);
}

logger.stream = {
	write: (message) => {
		logger.info(message);
	},
};

module.exports = logger;
