const post = await Post.create({
	title: "Post 1",
	content: "Post 1 content",
	diagnosis: "Post 1 diagnosis",
	treatmentPlan: "Post 1 treatmentPlan",
	user: "64088884f421a87d8a11fca8",
	comments: ["64088884f421a87d8a11fca8"],
});
post.save();