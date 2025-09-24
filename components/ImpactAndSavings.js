import { StyleSheet } from 'react-native';
import { Card, Paragraph, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ImpactAndSavings() {
  const theme = useTheme();
  const mockSavings = 12;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Icon name="chart-bar" size={24} color={theme.colors.onSurface} />
        <Paragraph style={styles.text}>
          📊 This Week: ₹{mockSavings} saved
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontWeight: 'bold',
  },
});