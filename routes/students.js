const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/studentControllerDB')
const studentValidator = require('../middlewares/studentValidartoMiddleware')



// router.all('/', studentsController.getAllStudents)

router.get('/',studentsController.getAllStudents)

router.get('/:id',studentsController.getStudentById)

router.post('/',studentValidator,studentsController.addNewStudent)

router.delete('/:id',studentsController.deleteStudentById)

router.put('/:id',studentsController.updateStudent)

module.exports=router