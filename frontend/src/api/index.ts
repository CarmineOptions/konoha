import { API_URL, NETWORK } from "../constants/amm";

export type ApiConfig = {
    network?: "testnet" | "mainnet";
    version?: 1 | 2;
};

export const apiUrl = (path: string, config?: ApiConfig): string => {
    if (!path) {
        throw Error("Cannot query empty path");
    }

    const DEFAULT_CONFIG = { network: NETWORK, version: 1 };

    const finalConfig = { ...DEFAULT_CONFIG, ...(config || {}) };

    const base = new URL(API_URL);

    // avoid double slashes //
    const validatedPath = path.charAt(0) === "/" ? path.slice(1) : path;

    const finalPath = `/api/v${finalConfig.version}/${finalConfig.network}/${validatedPath}`;

    const url = new URL(finalPath, base);

    return url.toString();
};
