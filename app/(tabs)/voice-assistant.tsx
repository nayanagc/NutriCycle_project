import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// This is a mock API service. In a real app, this would be a real API call.
const getAiResponse = async (query) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const responses = {
        'What can I cook with my expiring food?': 'I found 3 recipes using your lettuce and tomatoes. Would you like the Caesar salad recipe first?',
        'How do I make Caesar salad?': 'First, wash and chop the lettuce. Then, mix with your Caesar dressing and croutons. Enjoy!',
        'default': 'Sorry, I couldn\'t find a solution for that. Could you please rephrase?'
      };
      resolve({ text: responses[query] || responses['default'] });
    }, 1500);
  });
};

export default function VoiceAssistantScreen() {
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const theme = useTheme();

  const handleMicPress = () => {
    // This is where you would start/stop listening for voice input.
    // Use a library like `react-native-voice` to handle this.
    if (listening) {
      // Stop listening and process the speech-to-text result
      console.log('Stopped listening');
      setListening(false);
      // Simulate voice input for demonstration
      processUserQuery('What can I cook with my expiring food?');
    } else {
      console.log('Started listening...');
      setListening(true);
    }
  };

  const handleSendText = () => {
    if (inputText.trim() === '') return;
    processUserQuery(inputText);
    setInputText('');
  };

  const processUserQuery = async (query) => {
    // Add user's message to the chat history
    setMessages(prev => [...prev, { text: query, sender: 'user' }]);

    // Show a loading message while waiting for the AI
    setMessages(prev => [...prev, { text: '...', sender: 'ai', loading: true }]);

    // Simulate AI response from the backend
    const aiResponse = await getAiResponse(query);

    // Remove loading message and add AI's response to the chat history
    setMessages(prev => prev.slice(0, -1).concat({ text: aiResponse.text, sender: 'ai' }));
  };

  const renderMessage = (message, index) => (
    <View
      key={index}
      style={[
        styles.messageContainer,
        message.sender === 'user' ? styles.userMessageContainer : styles.aiMessageContainer,
      ]}
    >
      <Text style={styles.messageText}>
        {message.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="AI Assistant" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Input area */}
      <View style={styles.inputContainer}>
        {/* Microphone Button */}
        <IconButton
          icon={listening ? 'stop-circle-outline' : 'microphone'}
          size={36}
          color={listening ? theme.colors.error : theme.colors.primary}
          onPress={handleMicPress}
          style={styles.micButton}
        />

        {/* Text Input */}
        <TextInput
          placeholder="Type your question..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.textInput}
          right={
            <TextInput.Icon 
              icon={() => <Icon name="send" size={24} color={theme.colors.primary} />}
              onPress={handleSendText}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  userMessageContainer: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
  },
  aiMessageContainer: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  micButton: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
  },
});