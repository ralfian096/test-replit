import { TransactionTable } from '../TransactionTable'

export default function TransactionTableExample() {
  const mockTransactions = [
    {
      id: "1",
      type: "income" as const,
      amount: 5000000,
      category: "Gaji",
      description: "Gaji bulanan",
      date: new Date(2024, 9, 1),
    },
    {
      id: "2",
      type: "expense" as const,
      amount: 500000,
      category: "Makanan & Minuman",
      description: "Belanja bulanan",
      date: new Date(2024, 9, 5),
    },
  ];

  return <TransactionTable transactions={mockTransactions} />
}
