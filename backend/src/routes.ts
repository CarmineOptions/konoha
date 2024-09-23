import { Router } from 'express';
import { submitProposal } from './ipfs';
import { getVestingEvents } from './starknet';
import { Request, Response } from 'express';

const router = Router();

// Existing route for submitting proposals
router.post('/submit', submitProposal);

// Vesting events for user
router.get('/vesting-events', async (req: Request, res: Response) => {
    const { contract, address } = req.query;

    // Ensure that contract and address are strings, not arrays or other types
    if (typeof contract !== 'string' || typeof address !== 'string') {
        return res.status(400).json({ error: 'Both contract and address must be valid strings.' });
    }

    console.log(`Received request for vesting events with contract: ${contract} and address: ${address}`);

    try {
        const events = await getVestingEvents(contract, address);
        res.json(events);
    } catch (error) {
        console.error('Error fetching vesting events:', error);
        res.status(500).json({ error: 'Error fetching vesting events.' });
    }
});


export default router;
