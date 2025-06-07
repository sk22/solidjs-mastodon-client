interface ImportMetaEnv {
	readonly VITE_CLIENT_URL: string;
	readonly VITE_CLIENT_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
