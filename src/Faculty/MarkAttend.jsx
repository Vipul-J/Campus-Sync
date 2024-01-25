import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Button as PaperButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const MarkAttend = () => {
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTimings, setSelectedTimings] = useState('');
    const [selectedProfessor, setSelectedProfessor] = useState('');
    const [attendanceData, setAttendanceData] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [professors, setProfessors] = useState([]);

    const classOptions = ['IA1', 'IA2', 'IA3', 'IIIA1', 'IIIA2', 'IVA1'];
    const subjectOptions = ['Cyber Security', 'DAA', 'Android', 'Python', 'Web Tech'];
    const randomTimings = ['09:00 AM - 10:30 AM', '11:00 AM - 12:30 PM', '02:00 PM - 03:30 PM'];
    const classProfessors = ['Prof. Suni Vernekar', 'Prof. Akhila Kohday', 'Prof. Hema Chokaraddi', 'Prof. Vishwanath Patil', 'Prof. Ashwatth Uppor', 'Prof. Sridevi Kuri', 'Prof. Sushma Naikar', 'Prof. Rohit K'];

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://192.168.10.34:3001/api/getStudentsByClass/${selectedClass}`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        if (selectedClass) {
            fetchStudents();
        } else {
            setStudents([]);
        }
    }, [selectedClass]);

    const handleFormSubmit = async () => {
        try {
            Alert.alert(
                'Confirm',
                'Are you sure you want to mark attendance?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'OK',
                        onPress: async () => {
                            await axios.post('http://192.168.10.34:3001/api/markAttendance', {
                                selectedClass,
                                selectedSubject,
                                selectedTimings,
                                selectedDate,
                                selectedProfessor,
                                attendanceData,
                            });

                            setSelectedClass('');
                            setSelectedSubject('');
                            setSelectedTimings('');
                            setSelectedProfessor('');
                            setSelectedDate(new Date());
                            setAttendanceData({});
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error marking attendance:', error);
        }
    };

    const handleRadioChange = (studentId, status) => {
        setAttendanceData((prevAttendanceData) => ({
            ...prevAttendanceData,
            [studentId]: status,
        }));
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setSelectedDate(selectedDate);
        }
    };

    return (
        <ScrollView style={styles.container} >
            <Text style={styles.title}>Mark Attendance</Text>

            <Picker
                selectedValue={selectedClass}
                onValueChange={(value) => setSelectedClass(value)}
                style={styles.picker}
            >
                <Picker.Item label="Select Class" value="" />
                {classOptions.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>

            <Picker
                selectedValue={selectedSubject}
                onValueChange={(value) => setSelectedSubject(value)}
                style={styles.picker}
            >
                <Picker.Item label="Select Subject" value="" />
                {subjectOptions.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>

            <Picker
                selectedValue={selectedProfessor}
                onValueChange={(value) => setSelectedProfessor(value)}
                style={styles.picker}
            >
                <Picker.Item label="Select Professor" value="" />
                {classProfessors.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>

            <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
                <Text>Date: {selectedDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <Picker
                selectedValue={selectedTimings}
                onValueChange={(value) => setSelectedTimings(value)}
                style={styles.picker}
            >
                <Picker.Item label="Select Timings" value="" />
                {randomTimings.map((timing) => (
                    <Picker.Item key={timing} label={timing} value={timing} />
                ))}
            </Picker>

            <PaperButton mode="contained" onPress={handleFormSubmit} style={styles.button}>
                Submit
            </PaperButton>
            <View style={styles.shadow}>
                {students.length > 0 ? (
                    <View style={styles.studentList}>
                        <Text style={styles.listTitle}>Student List</Text>

                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.headerText}>Name</Text>
                            <Text style={styles.headerText}>Reg No</Text>
                            <Text style={styles.headerText}>Present</Text>
                            <Text style={styles.headerText}>Absent</Text>
                        </View>

                        {/* Student List Table */}
                        {students.map((student) => (
                            <View key={student._id} style={styles.studentItem}>
                                <Text style={styles.cellText}>{student.name}</Text>
                                <Text style={styles.cellText}>{student.regNo}</Text>
                                <View style={styles.checkboxContainer}>
                                    <TouchableOpacity onPress={() => handleRadioChange(student._id, 'present')}>
                                        <AntDesign
                                            name={attendanceData[student._id] === 'present' ? 'checkcircle' : 'checkcircleo'}
                                            size={24}
                                            color="green"
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.checkboxText}>   </Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <TouchableOpacity onPress={() => handleRadioChange(student._id, 'absent')}>
                                        <AntDesign
                                            name={attendanceData[student._id] === 'absent' ? 'closecircle' : 'closecircleo'}
                                            size={24}
                                            color="red"
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.checkboxText}> </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.noDataText}>No student data available</Text>
                )}
                <Text style={styles.bottomSpace}></Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
        padding: 20, 
        marginTop: 32 // Background color for the entire screen
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333', // Text color
    },
    picker: {
        marginBottom: 16,
        backgroundColor: '#ffffff', // Background color for pickers
    },
    datePicker: {
        marginBottom: 16,
        paddingVertical: 8,
        backgroundColor: '#ffffff', // Background color for date picker
    },
    button: {
        marginBottom: 16,
        backgroundColor: '#3e4095', // Button background color
    },
    studentList: {
        marginTop: 16,
        backgroundColor: '#ffffff', // Background color for student list
        borderRadius: 8, // Border radius for student list
        padding: 16,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333', // Text color
    },
    studentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    noDataText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#777', // Text color for no data
    },
    shadow: {
        elevation: 5,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    tableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e0e0e0',
        paddingVertical: 8,
        marginBottom: 8,
        borderRadius: 8, // Border radius for table header
    },
    headerText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: '#333', // Text color for header
    },
    cellText: {
        flex: 1,
        textAlign: 'left',
        margin: 5,
        color: '#333', // Text color for cells
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 60,
    },
    checkboxText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#333', // Text color for checkbox label
    },
    bottomSpace: {
        marginTop: 12,
        marginBottom: 14,
    },
});

export default MarkAttend;
