import { StatCard } from "@/components/StatCard";
import { FinancialChart } from "@/components/FinancialChart";
import { TransactionTable, Transaction } from "@/components/TransactionTable";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function Dashboard() {
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      amount: 5000000,
      category: "Gaji",
      description: "Gaji bulanan Oktober",
      date: new Date(2024, 9, 1),
    },
    {
      id: "2",
      type: "expense",
      amount: 500000,
      category: "Makanan & Minuman",
      description: "Belanja bulanan di supermarket",
      date: new Date(2024, 9, 5),
    },
    {
      id: "3",
      type: "expense",
      amount: 200000,
      category: "Transportasi",
      description: "Bensin dan tol",
      date: new Date(2024, 9, 8),
    },
    {
      id: "4",
      type: "income",
      amount: 1500000,
      category: "Freelance",
      description: "Project website client",
      date: new Date(2024, 9, 10),
    },
    {
      id: "5",
      type: "expense",
      amount: 800000,
      category: "Tagihan",
      description: "Listrik dan internet",
      date: new Date(2024, 9, 12),
    },
  ];

  const chartData = [
    { month: "Jul", income: 7500000, expense: 5800000 },
    { month: "Agu", income: 8200000, expense: 6200000 },
    { month: "Sep", income: 7800000, expense: 5500000 },
    { month: "Oct", income: 9000000, expense: 6800000 },
  ];

  const totalIncome = mockTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = mockTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Ringkasan keuangan Anda bulan ini
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Saldo"
          amount={formatCurrency(balance)}
          icon={Wallet}
          trend={{ value: "12.5%", isPositive: true }}
          iconColor="bg-primary/10"
        />
        <StatCard
          title="Total Pemasukan"
          amount={formatCurrency(totalIncome)}
          icon={TrendingUp}
          trend={{ value: "8.3%", isPositive: true }}
          iconColor="bg-chart-1/10"
        />
        <StatCard
          title="Total Pengeluaran"
          amount={formatCurrency(totalExpense)}
          icon={TrendingDown}
          trend={{ value: "4.2%", isPositive: false }}
          iconColor="bg-chart-3/10"
        />
      </div>

      <FinancialChart data={chartData} title="Tren Keuangan 4 Bulan Terakhir" />

      <div>
        <h2 className="text-xl font-semibold mb-4">Transaksi Terakhir</h2>
        <TransactionTable
          transactions={mockTransactions.slice(0, 5)}
          onEdit={(id) => console.log("Edit transaction:", id)}
          onDelete={(id) => console.log("Delete transaction:", id)}
        />
      </div>
    </div>
  );
}
