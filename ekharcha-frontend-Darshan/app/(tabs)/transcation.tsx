import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export default function AddTransactionScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      // Add transaction logic here
    } catch (err) {
      setError('Failed to add transaction');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Transaction</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.typeSelector}>
          <Button
            title="Expense"
            variant={type === 'EXPENSE' ? 'primary' : 'outline'}
            onPress={() => setType('EXPENSE')}
          />
          <View style={styles.typeSeparator} />
          <Button
            title="Income"
            variant={type === 'INCOME' ? 'primary' : 'outline'}
            onPress={() => setType('INCOME')}
          />
        </View>

        <Input
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          error={error}
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />
        <Input
          label="Category"
          value={category}
          onChangeText={setCategory}
          placeholder="Select category"
        />

        <Button
          title="Add Transaction"
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
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
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
  },
  form: {
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  typeSeparator: {
    width: 16,
  },
});