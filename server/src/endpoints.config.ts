export default {
	dbConnectionUrl: process.env.CONNECTION_URL ?? '',
	port: process.env.PORT ?? 5000,
	secret: process.env.SECRET ?? ''
};
