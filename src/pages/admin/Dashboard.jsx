import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import api from "../../api";

function money(value) {
  return `$${Number(value || 0).toLocaleString()}`;
}

export default function Dashboard() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    api.get("/admin/overview").then((res) => setCards(res.data.cards)).catch(console.error);
  }, []);

  const cardItems = cards
    ? [
        ["Total Borrowers", cards.totalBorrowers],
        ["Active Loans", cards.activeLoans],
        ["Pending Applications", cards.pendingApplications],
        ["Overdue Payments", cards.overduePayments],
        ["Total Amount Disbursed", money(cards.totalDisbursed)],
        ["Total Repayments", money(cards.totalRepayments)],
        ["Monthly Profit", money(cards.monthlyProfit)],
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard Overview</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cardItems.map(([title, value]) => (
          <Card key={title}><p className="text-sm text-slate-400">{title}</p><p className="mt-2 text-2xl font-bold text-white">{value}</p></Card>
        ))}
      </div>
    </div>
  );
}
