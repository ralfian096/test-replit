import { FinancialChart } from "@/components/FinancialChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Reports() {
  const [period, setPeriod] = useState("6months");

  const chartData = [
    { month: "Mei", income: 6800000, expense: 5200000 },
    { month: "Jun", income: 7200000, expense: 5800000 },
    { month: "Jul", income: 7500000, expense: 5800000 },
    { month: "Agu", income: 8200000, expense: 6200000 },
    { month: "Sep", income: 7800000, expense: 5500000 },
    { month: "Okt", income: 9000000, expense: 6800000 },
  ];

  const categoryData = [
    { category: "Gaji", amount: 30000000 },
    { category: "Freelance", amount: 8500000 },
    { category: "Bonus", amount: 2500000 },
  ];

  const expenseData = [
    { category: "Makanan & Minuman", amount: 6000000 },
    { category: "Transportasi", amount: 3500000 },
    { category: "Tagihan", amount: 4800000 },
    { category: "Hiburan", amount: 2100000 },
    { category: "Belanja", amount: 5200000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalIncome = categoryData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const profit = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Laporan Keuangan</h1>
          <p className="text-muted-foreground mt-2">
            Analisis detail keuangan Anda
          </p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]" data-testid="select-period">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">3 Bulan Terakhir</SelectItem>
            <SelectItem value="6months">6 Bulan Terakhir</SelectItem>
            <SelectItem value="1year">1 Tahun Terakhir</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Total Pemasukan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1 tabular-nums">
              {formatCurrency(totalIncome)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Total Pengeluaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3 tabular-nums">
              {formatCurrency(totalExpense)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Laba Bersih
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold tabular-nums ${profit >= 0 ? 'text-chart-1' : 'text-chart-3'}`}>
              {formatCurrency(profit)}
            </div>
          </CardContent>
        </Card>
      </div>

      <FinancialChart data={chartData} title="Perbandingan Pemasukan & Pengeluaran" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pemasukan per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm font-semibold text-chart-1 tabular-nums">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengeluaran per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseData.map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm font-semibold text-chart-3 tabular-nums">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
