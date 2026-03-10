const Booking = require("../models/Booking");
const User = require("../models/User");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      providerName,
      service,
      price,
      location,
      address,
      date,
      time,
      phone,
      additionalNotes,
    } = req.body;

    // Get user information from the authenticated user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new booking
    const booking = new Booking({
      customerId: user._id,
      customerName: user.name,
      customerEmail: user.email,
      providerName,
      service,
      price,
      location,
      address,
      date,
      time,
      phone,
      additionalNotes: additionalNotes || "",
      status: "pending",
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res
      .status(500)
      .json({
        message: "Server error while creating booking",
        error: error.message,
      });
  }
};

// Get all bookings for a customer
exports.getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Bookings retrieved successfully",
      bookings,
    });
  } catch (error) {
    console.error("Get customer bookings error:", error);
    res
      .status(500)
      .json({
        message: "Server error while retrieving bookings",
        error: error.message,
      });
  }
};

// Get all bookings for a service provider (by provider name)
exports.getProviderBookings = async (req, res) => {
  try {
    const { providerName } = req.params;

    const bookings = await Booking.find({ providerName }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Provider bookings retrieved successfully",
      bookings,
    });
  } catch (error) {
    console.error("Get provider bookings error:", error);
    res
      .status(500)
      .json({
        message: "Server error while retrieving bookings",
        error: error.message,
      });
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the user is authorized to view this booking
    if (booking.customerId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this booking" });
    }

    res.status(200).json({
      message: "Booking retrieved successfully",
      booking,
    });
  } catch (error) {
    console.error("Get booking error:", error);
    res
      .status(500)
      .json({
        message: "Server error while retrieving booking",
        error: error.message,
      });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Update booking status error:", error);
    res
      .status(500)
      .json({
        message: "Server error while updating booking",
        error: error.message,
      });
  }
};

// Delete/Cancel a booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the user is authorized to delete this booking
    if (booking.customerId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this booking" });
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error);
    res
      .status(500)
      .json({
        message: "Server error while deleting booking",
        error: error.message,
      });
  }
};
