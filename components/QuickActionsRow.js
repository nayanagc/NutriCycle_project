import { useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export default function QuickActionsRow() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={styles.container}>
          <Button
      mode="contained"
      onPress={() => navigation.navigate('add')}
      style={{ marginTop: 16 }}
      icon="plus-circle-outline"
    >
      Add Items
    </Button>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  button: {
    flex: 1,
  },
});