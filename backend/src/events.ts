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
    console.log("fetched ", newlyFetched.length, " events")
    const events = [...cached.events, ...newlyFetched];
    const cacheKey = { contract, fromBlock };
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
        console.debug('continuing', events.continuation_token);
        console.debug(res.length)
        const nextEvents = await fetchVestingEvents(contract, provider, fromBlock, events.continuation_token);
        res = [...res, ...nextEvents];
    }

    return res;
}