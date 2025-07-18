/// <reference types="vite/client" />
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
