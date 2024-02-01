const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

 mongoose.connect('mongodb://localhost:27017/attendanceAdmin', {
  useUnifiedTopology: true,
});

const Student = mongoose.model('Student', {
  name: String,
  regNo: String,
  studentClass: String,
  attendance: [{ subject: String, timings: String, date: Date, status: String, professor: String }],
});

const Leave = mongoose.model('Leave', {
  studentRegNum: String,
  studentName: String,
  subject: String,
  description: String,
  fromDate: Date,
  toDate: Date,
  status: String, 
});

const Announcement = mongoose.model('Announcement', {
  facultyName: String,
  subject: String,
  description: String,
  pdf: Buffer, 
});

app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/api/saveStudents', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const studentsData = xlsx.utils.sheet_to_json(sheet);

    for (const studentData of studentsData) {
      const { 'Student name': name, 'Student reg': regNo, 'Student Class': studentClass } = studentData;
      const student = new Student({ name, regNo, studentClass });
      await student.save();
    }

    res.status(201).json({ message: 'Student data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getSavedStudents', async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 app.put('/api/editStudent/:id', async (req, res) => {
    try {
      const { name, regNo, studentClass } = req.body;
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        { name, regNo, studentClass },
        { new: true }
      );
      res.json(updatedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 app.get('/api/getStudentsByClass/:class', async (req, res) => {
  try {
    const students = await Student.find({ studentClass: req.params.class });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/markAttendance', async (req, res) => {
  try {
    const { selectedClass, selectedSubject, selectedTimings, attendanceData, selectedProfessor } = req.body;

    // Iterate over students and update attendance history
    for (const studentId in attendanceData) {
      const status = attendanceData[studentId];
      const student = await Student.findById(studentId);

      if (student) {
        student.attendance.push({
          subject: selectedSubject,
          professor: selectedProfessor,  
          timings: selectedTimings,
          date: new Date(),
          status: status,
        });

        await student.save();
      }
    }

    res.json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getStudentByRegNumber/:regNumber', async (req, res) => {
  try {
    const student = await Student.findOne({ regNo: req.params.regNumber });

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 app.post('/api/saveAnnouncement', upload.single('pdf'), async (req, res) => {
  console.log('Received FormData:', req.body);
  console.log('Received File:', req.file);

  try {
    const { facultyName, subject, description } = req.body;

    // Check if PDF file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Save announcement data and PDF buffer to MongoDB
    const announcement = new Announcement({
      facultyName,
      subject,
      description,
      pdf: req.file.buffer.toString('base64'), // Convert buffer to base64 string
    });

    await announcement.save();

    res.status(201).json({ message: 'Announcement saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getAllAnnouncements', async (req, res) => {
  try {
    const allAnnouncements = await Announcement.find();
    res.json(allAnnouncements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 

app.post('/api/applyLeave', async (req, res) => {
  try {
    const { studentRegNum, studentName, subject, description, fromDate, toDate } = req.body;

    const leave = new Leave({
      studentRegNum,
      studentName,
      subject,
      description,
      fromDate,
      toDate,
      status: 'pending',
    });

    await leave.save();

    res.json({ success: true, message: 'Leave application submitted successfully', leaveId: leave._id, status: leave.status });
  } catch (error) {
    console.error('Error applying leave:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

app.get('/api/getLeaveApplications/:studentRegNum', async (req, res) => {
  try {
    const { studentRegNum } = req.params;

    // Fetch leave applications from the database for the specified student
    const leaveApplications = await Leave.find({ studentRegNum });

    return res.status(200).json({
      success: true,
      leaveApplications,
    });
  } catch (error) {
    console.error('Error fetching leave applications:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});


app.put('/api/processLeaveApplication/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });

    res.json({ success: true, message: 'Leave application processed successfully', status: leave.status });
  } catch (error) {
    console.error('Error processing leave application:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

app.get('/api/getLeaveApplications', async (req, res) => {
  try {
    const leaveApplications = await Leave.find();
    res.json({ success: true, leaveApplications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



const submissionSchema = new mongoose.Schema({
  facultyName: String,
  subject: String,
  title: String,
  description: String,
});

const Submission = mongoose.model('Submission', submissionSchema);

app.use(bodyParser.json());

app.post('/api/submissions', async (req, res) => {
  try {
    const { facultyName, subject, title, description } = req.body;

    const newSubmission = new Submission({
      facultyName,
      subject,
      title,
      description,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Submission saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const chatSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const Chat = mongoose.model('Chat', chatSchema);

app.get('/api/chat', async (req, res) => {
  const messages = await Chat.find();
  res.json(messages);
});

app.post('/api/chat', async (req, res) => {
  const { user, message } = req.body;
  const newMessage = new Chat({ user, message });
  await newMessage.save();
  res.json(newMessage);
});


 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

