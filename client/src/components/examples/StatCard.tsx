import { StatCard } from '../StatCard'
import { Wallet } from 'lucide-react'

export default function StatCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard 
        title="Total Saldo"
        amount="Rp 15.250.000"
        icon={Wallet}
        trend={{ value: "12.5%", isPositive: true }}
      />
    </div>
  )
}
