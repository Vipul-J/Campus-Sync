import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text, Avatar, List, Tooltip, Title } from 'react-native-paper';
import axios from 'axios';

const FacultyChat = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://192.168.115.252:3001/api/chat');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const validateFields = () => {
    const isNameValid = user.trim() !== '';
    const isMessageValid = message.trim() !== '';

    setNameError(!isNameValid);
    setMessageError(!isMessageValid);

    return isNameValid && isMessageValid;
  };

  const sendMessage = async () => {
    if (validateFields()) {
      try {
        await axios.post('http://192.168.115.252:3001/api/chat', { user, message });
        fetchMessages();
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
                         <Title style={styles.heading}> KLES's BCA Student Community</Title>

      <FlatList
        style={styles.chatContainer}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, { alignSelf: item.user === user ? 'flex-end' : 'flex-start' }]}>
            <View style={styles.messageWrapper}>
              <View style={styles.messageHeader}>
                <Avatar.Text size={24} label={item.user.charAt(0)} />
                <Text style={styles.senderName}>{item.user}</Text>
              </View>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.nameInput}
          label="Your name"
          value={user}
          onChangeText={(text) => setUser(text)}
          error={nameError}
        />
        {nameError && (
          <Tooltip visible={nameError} onDismiss={() => setNameError(false)} style={styles.tooltip}>
            Name is required.
          </Tooltip>
        )}
        <TextInput
          style={styles.messageInput}
          label="Type your message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          error={messageError}
        />
        {messageError && (
          <Tooltip visible={messageError} onDismiss={() => setMessageError(false)} style={styles.tooltip}>
            Message is required.
          </Tooltip>
        )}
        <Button mode="contained" onPress={sendMessage} disabled={!user.trim() || !message.trim()}>
          Send
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 18, 
    backgroundColor: '#f8f9fa',  
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 32,
    color: '#3e4095',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    flex: 1,
    marginRight: 8,
    marginVertical: 8,
    backgroundColor: '#ecf0f1',
  },
  messageInput: {
    flex: 3,
    marginRight: 8,
    marginVertical: 8,
    backgroundColor: '#ecf0f1',
  },
  tooltip: {
    backgroundColor: '#e74c3c',  
  },
  messageContainer: {
    marginBottom: 8,
  },
  messageWrapper: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#DCF8C6',  
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#000000',  
  },
  messageText: {
    color: '#000000',  
  },
});

export default FacultyChat;
