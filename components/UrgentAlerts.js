import { StyleSheet } from 'react-native';
import { Card, Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const mockUrgentItems = 3;

export default function UrgentAlerts() {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { borderColor: theme.colors.error, backgroundColor: theme.colors.errorContainer }]}>
      <Card.Content style={styles.cardContent}>
        <Icon name="alert-circle-outline" size={24} color={theme.colors.onErrorContainer} />
        <Title style={[styles.alertText, { color: theme.colors.onErrorContainer }]}>
          {mockUrgentItems} items expiring today
        </Title>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderLeftWidth: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertText: {
    fontWeight: 'bold',
  },
});