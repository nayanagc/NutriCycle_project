import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Card, List, Paragraph, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CommunityScreen() {
  const theme = useTheme();

  // Mock data for nearby food banks and user impact
  const foodBanks = [
    { name: 'City Food Bank', distance: '0.5 mi', icon: 'warehouse' },
    { name: 'Community Kitchen', distance: '1.2 mi', icon: 'storefront' },
    { name: 'Local Shelter', distance: '2.1 mi', icon: 'home-group' },
  ];

  const userImpact = {
    mealsDonated: 45,
    moneySaved: 234,
    wastePrevented: 12,
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.Content title="Community Impact" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Nearby Food Banks Section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="map-marker-radius" size={24} color={theme.colors.onSurface} />
              <Title style={styles.sectionTitle}>Nearby Food Banks</Title>
            </View>
            <List.Section>
              {foodBanks.map((bank, index) => (
                <List.Item
                  key={index}
                  title={bank.name}
                  description={`${bank.distance}`}
                  left={() => <Icon name={bank.icon} size={30} color={theme.colors.secondary} />}
                  onPress={() => { /* Navigate to map or provide directions */ }}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>

        {/* Your Impact Section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Icon name="chart-bar" size={24} color={theme.colors.onSurface} />
              <Title style={styles.sectionTitle}>Your Impact</Title>
            </View>
            
            <View style={styles.impactGrid}>
              <View style={styles.impactItem}>
                <Icon name="silverware-fork-knife" size={40} color="#FF9800" />
                <Paragraph style={styles.impactValue}>{userImpact.mealsDonated}</Paragraph>
                <Paragraph style={styles.impactLabel}>meals donated</Paragraph>
              </View>

              <View style={styles.impactItem}>
                <Icon name="currency-usd" size={40} color="#4CAF50" />
                <Paragraph style={styles.impactValue}>₹{userImpact.moneySaved}</Paragraph>
                <Paragraph style={styles.impactLabel}>saved this month</Paragraph>
              </View>
              
              <View style={styles.impactItem}>
                <Icon name="recycle" size={40} color="#2196F3" />
                <Paragraph style={styles.impactValue}>{userImpact.wastePrevented} lbs</Paragraph>
                <Paragraph style={styles.impactLabel}>waste prevented</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
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
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  impactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  impactItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 8,
  },
  impactValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  impactLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
});