module.exports = (func) => (req, res, next) => {
	Promise.resolve(func(req, res, next)).catch((err) => {
		console.log(err);
		next(err);
	});
};
