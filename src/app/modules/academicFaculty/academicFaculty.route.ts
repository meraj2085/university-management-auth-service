import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

// Create a new faculty
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

// Get all faculties
router.get('/', AcademicFacultyController.getAllFaculties);

// Get single faculty
router.get('/:id', AcademicFacultyController.getSingleFaculty);

// Update a faculty
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

// Delete a faculty
router.delete('/:id', AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoutes = router;
