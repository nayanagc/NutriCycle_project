import { View } from 'react-native';
import ImpactAndSavings from './ImpactAndSavings';
import InventorySnapshots from './InventorySnapshots';
import QuickActionsRow from './QuickActionsRow';
import UrgentAlerts from './UrgentAlerts';

export default function DashboardContent() {
  return (
    <View>
      <UrgentAlerts />
      <InventorySnapshots />
      <QuickActionsRow />
      <ImpactAndSavings />
      {/* Navigation Bar is now handled in the _layout.tsx file (Tabs) */}
    </View>
  );
}