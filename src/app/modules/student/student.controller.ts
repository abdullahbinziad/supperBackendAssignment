import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: "Student is created Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB();

  res.status(200).json({
    success: true,
    message: "Students are retrived Successfully",
    data: result,
  });
  try {
  } catch (error) {
    console.log(error);
  }
};

//getsingle studentData

const getsingleStudents = async (req: Request, res: Response) => {
  const studentID = req.params.id;
  const result = await StudentServices.getSingleStudentFromDB(studentID);

  res.status(200).json({
    success: true,
    message: "Students are retrived Successfully",
    data: result,
  });
  try {
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getsingleStudents,
};
