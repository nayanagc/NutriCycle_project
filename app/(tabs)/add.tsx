import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Card, Paragraph, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddItemsScreen() {
  const [isManualModalVisible, setManualModalVisible] = useState(false);
  const [foodItem, setFoodItem] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [items, setItems] = useState([]); // State array to store all added items
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'This app needs camera access.');
      }
    })();
  }, []);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Cannot take a photo without camera permission.');
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // Add a new item with the image URI to the state array
      const newItem = {
        type: 'image',
        uri: result.assets[0].uri,
        id: Math.random().toString(), // Use a unique ID
      };
      setItems(prevItems => [...prevItems, newItem]);
    }
  };

  const handleManualAdd = () => {
    if (!foodItem.trim()) {
      Alert.alert('Error', 'Please enter a food item name.');
      return;
    }
    // Add a new item with manual text to the state array
    const newItem = {
      type: 'manual',
      name: foodItem,
      expiration: expirationDate,
      id: Math.random().toString(), // Use a unique ID
    };
    setItems(prevItems => [...prevItems, newItem]);

    setManualModalVisible(false);
    setFoodItem('');
    setExpirationDate('');
  };

  const handleScanReceipt = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Cannot scan a receipt without camera permission.');
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // Add the receipt image to the state array
      const newItem = {
        type: 'receipt',
        uri: result.assets[0].uri,
        id: Math.random().toString(),
      };
      setItems(prevItems => [...prevItems, newItem]);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.headerTitle}>Add Food Items</Title>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity onPress={handleScanReceipt} style={styles.actionButton}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon name="receipt" size={30} color={theme.colors.primary} />
              <Paragraph style={styles.cardTitle}>Scan</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTakePhoto} style={styles.actionButton}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon name="camera-outline" size={30} color={theme.colors.primary} />
              <Paragraph style={styles.cardTitle}>Photo</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setManualModalVisible(true)} style={styles.actionButton}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon name="pencil-outline" size={30} color={theme.colors.primary} />
              <Paragraph style={styles.cardTitle}>Manual</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
      <Title style={styles.addedItemsTitle}>Added Items:</Title>
      {/* Scrollable list to show added items */}
      <ScrollView contentContainerStyle={styles.addedItemsContainer}>
        {items.length === 0 ? (
          <Text style={styles.noItemsText}>No items added yet.</Text>
        ) : (
          items.map(item => (
            <Card key={item.id} style={styles.itemCard}>
              <Card.Content style={styles.itemContent}>
                {item.type === 'manual' ? (
                  <View>
                    <Title>{item.name}</Title>
                    {item.expiration && <Paragraph>Expires: {item.expiration}</Paragraph>}
                  </View>
                ) : (
                  <View>
                    <Image source={{ uri: item.uri }} style={styles.itemImage} />
                    <Paragraph style={styles.imageLabel}>{item.type === 'receipt' ? 'Receipt Scan' : 'Food Photo'}</Paragraph>
                  </View>
                )}
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>

      {/* Manual Entry Modal */}
      <Modal visible={isManualModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Manual Entry</Text>
          <TextInput
            placeholder="Food Item Name"
            value={foodItem}
            onChangeText={setFoodItem}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Expiration Date (YYYY-MM-DD)"
            value={expirationDate}
            onChangeText={setExpirationDate}
            style={styles.textInput}
          />
          <Button mode="contained" onPress={handleManualAdd} style={styles.modalButton}>
            Add Item
          </Button>
          <Button mode="outlined" onPress={() => setManualModalVisible(false)} style={styles.modalButton}>
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  card: {
    borderRadius: 12,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addedItemsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addedItemsContainer: {
    flexGrow: 1,
  },
  itemCard: {
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  imageLabel: {
    fontWeight: 'bold',
  },
  noItemsText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  modalButton: {
    marginTop: 10,
  },
});