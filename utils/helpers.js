module.exports = {
	format_time: date => {
		return date.toLocaleTimeString();
	},
	format_date: date => {
		return `${ new Date(date).getMonth() + 1 }/${ new Date(date).getDate() }/${ new Date(date).getFullYear() }`;
	},

	isEqual: function (a, b, opts) {
		if (a == b) {
			return true;
		} else {
			return false;
		}
	}
};
