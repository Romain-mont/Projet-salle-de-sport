export const errorHandler = (err, req, res, next) => {
	console.error(err);
	console.log("is joi", err.isJoi);

	if (err.isJoi) {
		return res.status(400).json({
			status: "error",
			type: "validation_error",
			message: err.details.map((detail) => detail.message).join(", "),
		});
	}

	if (
		err.name === "SequelizeValidationError" ||
		err.name === "SequelizeUniqueConstraintError"
	) {
		return res.status(400).json({
			status: "error",
			type: "database_validation_error",
			message: err.errors.map((e) => e.message).join(", "),
		});
	}

	res.status(500).json({
		status: "error",
		type: "server_error",
		message: "Une erreur est survenue sur le serveur",
	});
};
