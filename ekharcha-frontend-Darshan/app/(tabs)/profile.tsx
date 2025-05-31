import { Image, StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../../store/auth'; // Update the import path if necessary
// Update the import path below if your Button component is located elsewhere
import { Button } from '../../components/Button';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user?.imageUrl || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <Button
            title="Edit Profile"
            variant="outline"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <Button
            title="Change Password"
            variant="outline"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <Button
            title="Notification Settings"
            variant="outline"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <Button
            title="Currency"
            variant="outline"
            onPress={() => {}}
          />
          <View style={styles.separator} />
          <Button
            title="Categories"
            variant="outline"
            onPress={() => {}}
          />
        </View>

        <Button
          title="Sign Out"
          variant="secondary"
          onPress={logout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  separator: {
    height: 12,
  },
});