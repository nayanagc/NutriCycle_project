import { StyleSheet, Text, View } from 'react-native';

export default function AddItemsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Items 🛒</Text>
      <Text>Here you can scan receipts or add food manually.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600' }
});
