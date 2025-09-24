import { useNavigation } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import DashboardContent from '../../components/DashboardContent'; // Note the correct relative path

export default function HomeDashboard() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="NutriCycle" />
        <IconButton
          icon="web"
          color={theme.colors.onPrimary}
          onPress={() => { /* Navigate to Language Selection Screen */ }}
        />
        {/* Navigates to the Voice Assistant tab */}
        <IconButton
          icon="microphone"
          color={theme.colors.onPrimary}
          onPress={() => navigation.navigate('voice-assistant')}
        />
      </Appbar.Header>

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Renders all dashboard sections (Alerts, Inventory, etc.) */}
        <DashboardContent />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 16,
  },
});