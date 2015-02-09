exports = module.exports = function(app, mongoose) {

	var userSchema = new mongoose.Schema({
		name: String,
		username: {type: String, unique: true},
		email: {type: String, unique: true},
		password: String,
		role: {type: String, default: 'observer'},
		isActive: Boolean,
		date_created: {type: Date, default: Date.now}
	});

	userSchema.index({email: 1}, {unique: true});
	app.db.model('Users', userSchema);

};
