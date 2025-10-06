import { FinancialChart } from '../FinancialChart'

export default function FinancialChartExample() {
  const mockData = [
    { month: "Jan", income: 8000000, expense: 6000000 },
    { month: "Feb", income: 7500000, expense: 5500000 },
    { month: "Mar", income: 9000000, expense: 7000000 },
    { month: "Apr", income: 8500000, expense: 6500000 },
  ];

  return <FinancialChart data={mockData} />
}
