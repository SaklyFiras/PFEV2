// Function 1: Generate a random number between a given range
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function 2: Shuffle an array randomly
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Function 3: Generate a random string of a given length
function generateRandomString(length) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}
describe("getRandomNumber", () => {
	test("should generate a random number between the given range", () => {
		const min = 1;
		const max = 10;
		const randomNumber = getRandomNumber(min, max);
		expect(randomNumber).toBeGreaterThanOrEqual(min);
		expect(randomNumber).toBeLessThanOrEqual(max);
	});
});

describe("shuffleArray", () => {
	test("should shuffle the array randomly", () => {
		const array = [1, 2, 3, 4, 5];
		const shuffledArray = shuffleArray(array);
		expect(shuffledArray).toEqual(array);
		expect(shuffledArray).toHaveLength(array.length);
		expect(shuffledArray).toContain(1);
		expect(shuffledArray).toContain(2);
		expect(shuffledArray).toContain(3);
		expect(shuffledArray).toContain(4);
		expect(shuffledArray).toContain(5);
	});
});

describe("generateRandomString", () => {
	test("should generate a random string of the given length", () => {
		const length = 10;
		const randomString = generateRandomString(length);
		expect(randomString).toHaveLength(length);
		expect(typeof randomString).toBe("string");
	});
});