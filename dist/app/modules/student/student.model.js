"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define a schema for the name
const NameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Requered"],
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, "First Name is Requered"],
    },
});
// Define a schema for the guardian
const GuardianSchema = new mongoose_1.Schema({
    fatherName: { type: String },
    fatherOccupation: { type: String },
    fatherContactNo: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
});
// Define a schema for the local guardian
const LocalGuardianSchema = new mongoose_1.Schema({
    name: { type: String },
    occupation: { type: String },
    contactNo: { type: String },
    address: { type: String },
});
// Define the main student schema using the previously defined schemas
const StudentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: {
        type: NameSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "{VALUE}  is not valid ",
        },
        required: true,
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: { type: String },
    parmanentAddress: { type: String },
    gurdian: {
        type: GuardianSchema,
    },
    localGurdian: {
        type: LocalGuardianSchema,
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ["active", "blocked"],
        default: "active",
    },
});
const StudentModel = (0, mongoose_1.model)("Student", StudentSchema);
exports.default = StudentModel;
