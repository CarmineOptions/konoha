import { RpcProvider, hash } from "starknet";


interface CacheEntry {
    events: any[],
    lastBlock: number
}

const cache: Map<string, CacheEntry> = new Map();

export const getRawVestingEvents = async (contract: string, provider: RpcProvider, fromBlock: number): Promise<any[]> => {
    const latestBlockPromise = provider.getBlockLatestAccepted();
    let cached = getCachedVestingEvents(contract, fromBlock);

    const newlyFetched = await fetchVestingEvents(contract, provider, cached.lastBlock);
    const events = [...cached.events, ...newlyFetched];
    console.log('saving ', newlyFetched.length, ' newly fetched to cache');
    cache.set(`${contract}-${fromBlock}`, { events, lastBlock: (await latestBlockPromise).block_number });
    return events;
};

const getCachedVestingEvents = (contract: string, fromBlock: number): CacheEntry => {
    const cachedEntry = cache.get(`${contract}-${fromBlock}`)
    if (cachedEntry === undefined) {
        return { lastBlock: fromBlock, events: [] }
    };
    let nextEntry = getCachedVestingEvents(contract, cachedEntry.lastBlock);
    return { lastBlock: nextEntry.lastBlock, events: [...cachedEntry.events, ...nextEntry.events] }
}

const fetchVestingEvents = async (contract: string, provider: RpcProvider, fromBlock: number, continuation_token?: string) => {
    const eventFilter = {
        from_block: { block_number: fromBlock },
        chunk_size: 100,
        address: contract,
        keys: [[hash.getSelectorFromName('VestingEvent')]],
        ...(continuation_token && { continuation_token })
    };

    const events = await provider.getEvents(eventFilter);

    let res = events.events

    if (events.continuation_token) { // means we can continue, more to fetch
        const nextEvents = await fetchVestingEvents(contract, provider, fromBlock, events.continuation_token);
        res = [...res, ...nextEvents];
    }

    return res;
}