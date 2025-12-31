
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},

		lastName: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
		},

		password: {
			type: String,
			required: true,
		},

		phone: {
			type: Number,
		},

		postCode: {
			type: String,
		},

		address: {
			type: String,
		},

		avatar: {
			type: String,
		},
        bookings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ],

		role: {
			type: String,
			enum: ["customer", "cleaner", "admin"],
			default: "customer",
		},
	},
	{ timestamps: true }
);

const customerModel = mongoose.model("Customer", customerSchema);
module.exports = customerModel;
