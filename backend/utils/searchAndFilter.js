exports.generateFilterString = (inputString) => {
	let newInput = inputString.slice(1);
	newInput = newInput.slice(0, -1);
	const params = {};
	const parts = newInput.split(";");

	parts.forEach((part) => {
		const [key, value] = part.split(":");
		params[key] = value;
	});

	return params;
};

exports.SearchAndFilter = (filterString, keyword, posts) => {
	if (keyword) {
		if (keyword.Reference) {
			posts = posts.filter((post) => {
				if (
					post.postInfo.patientReference
						.toLowerCase()
						.includes(keyword.Reference.toLowerCase())
				) {
					return post;
				}
			});
		}
		if (keyword.Title) {
			posts = posts.filter((post) => {
				if (
					post.postInfo.title
						.toLowerCase()
						.includes(keyword.Title.toLowerCase())
				) {
					return post;
				}
			});
		}
		if (keyword.Author) {
			posts = posts.filter((post) => {
				if (
					post.user.name.toLowerCase().includes(keyword.Author.toLowerCase())
				) {
					return post;
				}
			});
		}
	}
	if (filterString.sortBy) {
		if (filterString.sortBy === "date") {
			posts = posts.sort((a, b) => b.createdAt - a.createdAt);
		} else if (filterString.sortBy === "likes") {
			posts = posts.sort((a, b) => b.likes.length - a.likes.length);
		} else if (filterString.sortBy === "comments") {
			posts = posts.sort((a, b) => b.comments.length - a.comments.length);
		}
	}

	if (filterString.location) {
		posts = posts.filter((post) => {
			if (post.user.location === filterString.location) {
				return post;
			}
		});
	}
	if (filterString.speciality) {
		posts = posts.filter((post) => {
			if (post.user.speciality === filterString.speciality) {
				return post;
			}
		});
	}
	if (filterString.status) {
		posts = posts.filter((post) => {
			if (post.user.status === filterString.status) {
				return post;
			}
		});
	}
	if (filterString.age) {
		posts = posts.filter((post) => {
			if (changeToAge(post.postInfo.dateOfBirth) <= Number(filterString.age)) {
				return post;
			}
		});
	}

	return posts;
};
exports.generateKeywordString = (inputString) => {
	let newInput = JSON.stringify(inputString);
	newInput = newInput.slice(1);
	newInput = newInput.slice(0, -1);
	const params = {};
	const parts = newInput.split(":");
	params[parts[0]] = parts[1];
	return params;
};

const changeToAge = (date) => {
	const today = new Date();
	const birthDate = new Date(date);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	if (age < 0) {
		return 0;
	}
	if (age > 100) {
		return 100;
	}
	return age;
};

exports.filterAndSearchGroups = (filterString, keyword, groups, user) => {
	if (keyword) {
		groups = groups.filter((group) => {
			if (group.name.toLowerCase().includes(keyword.toLowerCase())) {
				return group;
			}
		});
	}
	if (filterString === "rating") {
		groups = groups.sort(
			(a, b) =>
				b.ratings.reduce((a, b) => a + b.rating, 0) / b.ratings.length -
				a.ratings.reduce((a, b) => a + b.rating, 0) / a.ratings.length
		);
	}
	if (filterString === "members") {
		groups = groups.sort((a, b) => b.members.length - a.members.length);
	}
	if (filterString === "posts") {
		groups = groups.sort((a, b) => b.posts.length - a.posts.length);
	}
	if (filterString === "date") {
		groups = groups.sort((a, b) => b.createdAt - a.createdAt);
	}
	if (filterString === "fallowing") {
		groups = groups.filter((group) => {
			if (user.following.includes(group.owner._id)) {
				return group;
			}
		});
	}
	return groups;
};
