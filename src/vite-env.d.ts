/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BE_URL: string;
  readonly VITE_BE_URL_DEV: string;

  // Add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
