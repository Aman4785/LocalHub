const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const protect = require("../middleware/auth");

//const bookingController = require("../controllers/bookingController");
console.log("--- DEBUG START ---");
console.log("Is bookingController an object?", typeof bookingController === 'object');
console.log("Keys in bookingController:", Object.keys(bookingController));
console.log("Is createBooking a function?", typeof bookingController.createBooking === 'function');
console.log("--- DEBUG END ---");

// Create a new booking (protected route - requires authentication)
router.post("/create", protect, bookingController.createBooking);

// Get all bookings for the authenticated customer
router.get("/my-bookings", protect, bookingController.getCustomerBookings);

// Get all bookings for a specific provider
router.get("/provider/:providerName", bookingController.getProviderBookings);

// Get a single booking by ID
router.get("/:id", protect, bookingController.getBookingById);

// Update booking status
router.patch("/:id/status", protect, bookingController.updateBookingStatus);

// Delete/Cancel a booking
router.delete("/:id", protect, bookingController.deleteBooking);

module.exports = router;
