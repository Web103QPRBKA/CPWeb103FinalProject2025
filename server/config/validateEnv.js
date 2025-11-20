// Validate required environment variables
const requiredEnvVars = [
	'PGUSER',
	'PGPASSWORD',
	'PGHOST',
	'PGPORT',
	'PGDATABASE'
];

export function validateEnv() {
	const missing = requiredEnvVars.filter(varName => !process.env[varName]);

	if (missing.length > 0) {
		throw new Error(
			`Missing required environment variables: ${missing.join(', ')}\n` +
			'Please check your .env file and ensure all required variables are set.'
		);
	}
	
	console.log('✅ Environment variables validated successfully');
}
