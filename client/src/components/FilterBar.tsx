import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface FilterBarProps {
  onFilterChange?: (filters: {
    category: string;
    dateRange: DateRange | undefined;
  }) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [category, setCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const categories = [
    "Semua Kategori",
    "Gaji",
    "Bonus",
    "Investasi",
    "Makanan & Minuman",
    "Transportasi",
    "Belanja",
    "Tagihan",
    "Kesehatan",
    "Hiburan",
  ];

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onFilterChange?.({ category: value, dateRange });
    console.log("Category filter changed:", value);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    onFilterChange?.({ category, dateRange: range });
    console.log("Date range filter changed:", range);
  };

  const clearFilters = () => {
    setCategory("all");
    setDateRange(undefined);
    onFilterChange?.({ category: "all", dateRange: undefined });
    console.log("Filters cleared");
  };

  const hasActiveFilters = category !== "all" || dateRange !== undefined;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[200px]" data-testid="select-filter-category">
          <SelectValue placeholder="Pilih kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Kategori</SelectItem>
          {categories.slice(1).map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal min-w-[240px]"
            data-testid="button-filter-date"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd MMM yyyy", { locale: id })} -{" "}
                  {format(dateRange.to, "dd MMM yyyy", { locale: id })}
                </>
              ) : (
                format(dateRange.from, "dd MMM yyyy", { locale: id })
              )
            ) : (
              <span>Pilih rentang tanggal</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          data-testid="button-clear-filters"
        >
          <X className="mr-2 h-4 w-4" />
          Hapus Filter
        </Button>
      )}
    </div>
  );
}
