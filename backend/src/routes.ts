import { Router } from 'express';
import { submitProposal } from './ipfs';
import { getVestingEvents } from './starknet';

const router = Router();

// Existing route for submitting proposals
router.post('/submit', submitProposal);


// New route for fetching vesting events
router.get('/vesting-events/:address', async (req, res) => {
    const { address } = req.params;

    console.log(`Received request for vesting events with address ID: ${address}`);

    try {
        const events = await getVestingEvents(address);
        res.json(events);
    } catch (error) {
        console.error('Error fetching vesting events:', error);
        res.status(500).json({ error: `Error fetching events: ${error}` });
    }
});
export default router;