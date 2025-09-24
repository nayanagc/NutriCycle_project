import { StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const mockItems = [
  { name: 'Lettuce', daysLeft: 'today', icon: 'leaf' },
  { name: 'Bananas', daysLeft: '1 day left', icon: 'fruit-pineapple' },
  { name: 'Milk', daysLeft: '2 days left', icon: 'cup' },
];

export default function InventorySnapshots() {
  const theme = useTheme();

  return (
    <List.Section style={styles.section}>
      <List.Subheader>Expiring Soon</List.Subheader>
      {mockItems.map((item, index) => (
        <List.Item
          key={index}
          title={item.name}
          description={`Expires: ${item.daysLeft}`}
          left={() => (
            <Icon
              name={item.icon}
              size={30}
              color={item.daysLeft === 'today' ? theme.colors.error : theme.colors.secondary}
            />
          )}
          style={styles.listItem}
          onPress={() => { /* Navigate to Item Detail Screen */ }}
        />
      ))}
    </List.Section>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
  },
  listItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
});