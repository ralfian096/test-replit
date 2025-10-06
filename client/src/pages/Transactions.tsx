import { useState } from "react";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionTable, Transaction } from "@/components/TransactionTable";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function Transactions() {
  const [open, setOpen] = useState(false);

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
      description: "Bensin dan tol minggu ini",
      date: new Date(2024, 9, 8),
    },
    {
      id: "4",
      type: "income",
      amount: 1500000,
      category: "Freelance",
      description: "Project website untuk client",
      date: new Date(2024, 9, 10),
    },
    {
      id: "5",
      type: "expense",
      amount: 800000,
      category: "Tagihan",
      description: "Listrik, air, dan internet",
      date: new Date(2024, 9, 12),
    },
    {
      id: "6",
      type: "expense",
      amount: 350000,
      category: "Hiburan",
      description: "Nonton bioskop dan makan",
      date: new Date(2024, 9, 15),
    },
    {
      id: "7",
      type: "income",
      amount: 750000,
      category: "Bonus",
      description: "Bonus performa Q3",
      date: new Date(2024, 9, 18),
    },
    {
      id: "8",
      type: "expense",
      amount: 1200000,
      category: "Belanja",
      description: "Beli laptop accessories",
      date: new Date(2024, 9, 20),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transaksi</h1>
          <p className="text-muted-foreground mt-2">
            Kelola semua transaksi keuangan Anda
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-transaction">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Transaksi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Transaksi Baru</DialogTitle>
            </DialogHeader>
            <TransactionForm
              onSubmit={(data) => {
                console.log("New transaction:", data);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <FilterBar
        onFilterChange={(filters) => {
          console.log("Filters applied:", filters);
        }}
      />

      <TransactionTable
        transactions={mockTransactions}
        onEdit={(id) => console.log("Edit transaction:", id)}
        onDelete={(id) => console.log("Delete transaction:", id)}
      />
    </div>
  );
}
