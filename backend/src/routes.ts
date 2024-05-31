import { Router } from "express";
import { submitProposal } from "./ipfs.js";

const router = Router();

router.post("/submit", submitProposal);

export default router;
