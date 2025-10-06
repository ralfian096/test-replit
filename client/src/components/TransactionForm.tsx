import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.string().min(1, "Jumlah wajib diisi"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  date: z.date(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

const incomeCategories = [
  "Gaji",
  "Bonus",
  "Investasi",
  "Bisnis",
  "Freelance",
  "Lainnya"
];

const expenseCategories = [
  "Makanan & Minuman",
  "Transportasi",
  "Belanja",
  "Tagihan",
  "Kesehatan",
  "Hiburan",
  "Pendidikan",
  "Lainnya"
];

interface TransactionFormProps {
  onSubmit?: (data: TransactionFormValues) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [selectedType, setSelectedType] = useState<"income" | "expense">("expense");

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: new Date(),
    },
  });

  const handleSubmit = (data: TransactionFormValues) => {
    console.log("Transaction submitted:", data);
    if (onSubmit) {
      onSubmit(data);
    }
    form.reset();
  };

  const categories = selectedType === "income" ? incomeCategories : expenseCategories;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Transaksi</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={field.value === "income" ? "default" : "outline"}
                    onClick={() => {
                      field.onChange("income");
                      setSelectedType("income");
                      form.setValue("category", "");
                    }}
                    data-testid="button-type-income"
                    className="w-full"
                  >
                    Pemasukan
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "expense" ? "default" : "outline"}
                    onClick={() => {
                      field.onChange("expense");
                      setSelectedType("expense");
                      form.setValue("category", "");
                    }}
                    data-testid="button-type-expense"
                    className="w-full"
                  >
                    Pengeluaran
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    Rp
                  </span>
                  <Input
                    type="number"
                    placeholder="0"
                    className="pl-10 tabular-nums"
                    data-testid="input-amount"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      data-testid="button-date-picker"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP", { locale: id })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Catatan transaksi..."
                  className="resize-none"
                  rows={3}
                  data-testid="input-description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" data-testid="button-submit-transaction">
          Tambah Transaksi
        </Button>
      </form>
    </Form>
  );
}
