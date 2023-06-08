import httpStatus from 'http-status';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = { createSemester };
