import express from "express";
import { uploadTenderDocs } from "../middleware/multer.middleware.js" 
import { createTender, getAllTenders, getTenderById, updateTender, deleteTender } from "../controllers/tender.controller.js"

const router = express.Router();

/**
 * @route POST /api/tenders
 * @desc Create a new tender (Admin only)
 * @access Private
 */
router.post("/", uploadTenderDocs, createTender);

/**
 * @route GET /api/tenders
 * @desc Get all tenders
 * @access Public
 */
router.get("/", getAllTenders);

/**
 * @route GET /api/tenders/:id
 * @desc Get tender by ID
 * @access Public
 */
router.get("/:id", getTenderById);
router.put("/:id", uploadTenderDocs, updateTender);

router.delete('/:id', deleteTender);

export default router;
