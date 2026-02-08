const mongoose = require('mongoose');
const User = require('../../models/User.model');    

describe("User Model Test", () => {
    
    test("should create a user successfully", async () => {
        const userData = {
            username: "testuser",
            email: "testuser@example.com",
            password: "password123"
        };

        const user = new User(userData);
        await user.save();

        const foundUser = await User.findOne({ email: "testuser@example.com" });
        expect(foundUser).toBeTruthy(); // Check if user is found
        expect(foundUser.username).toBe("testuser"); // Check if username matches
    });
});