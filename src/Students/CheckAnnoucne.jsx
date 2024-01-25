import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const CheckAnnoucne = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.10.34:3001/api/getAllFormData');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const convertUint8ArrayToBase64 = (uint8Array) => {
    let binary = '';
    uint8Array.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Display Data</Text>
      {formData.length === 0 ? (
        <Text>No data available.</Text>
      ) : (
        <ScrollView>
          {formData.map((item) => (
            <View key={item._id} style={{ marginVertical: 10 }}>
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Faculty Name:</Text> {item.facultyName}{"\n"}
                <Text style={{ fontWeight: 'bold' }}>Subject:</Text> {item.subject}{"\n"}
                <Text style={{ fontWeight: 'bold' }}>Description:</Text> {item.description}
              </Text>

              {/* Convert Uint8Array to base64 string */}
              {console.log('PDF Content:', item.pdf)}
              <TouchableOpacity
                onPress={() => {
                  const base64Data = convertUint8ArrayToBase64(new Uint8Array(item.pdf.data));
                  const pdfUri = `data:application/pdf;base64,${base64Data}`;
                  Linking.openURL(pdfUri);
                }}
                style={{ marginTop: 10, padding: 10, backgroundColor: '#3e4095', borderRadius: 5 }}
              >
                <Text style={{ color: 'white' }}>Open PDF</Text>
              </TouchableOpacity>
              {/* You may display other information or customize this as needed */}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CheckAnnoucne;
