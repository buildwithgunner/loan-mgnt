export const borrowers = [
  {
    id: "B-1001",
    name: "Amara Ndlovu",
    email: "amara@client.com",
    phone: "+264811234567",
    status: "Active",
    blacklisted: false,
    suspended: false,
    guarantorId: "G-301",
    documents: ["ID Card", "Utility Bill", "Signed Agreement"],
  },
  {
    id: "B-1002",
    name: "Jonas Mbeha",
    email: "jonas@client.com",
    phone: "+264812345678",
    status: "Overdue",
    blacklisted: false,
    suspended: false,
    guarantorId: "G-302",
    documents: ["Passport Photo", "ID Card"],
  },
  {
    id: "B-1003",
    name: "Lydia Sam",
    email: "lydia@client.com",
    phone: "+264813333444",
    status: "Suspended",
    blacklisted: true,
    suspended: true,
    guarantorId: "G-303",
    documents: ["ID Card", "Signed Agreement"],
  },
];

export const loanApplications = [
  { id: "APP-100", borrowerId: "B-1001", amount: 15000, duration: "12 months", purpose: "Business stock", status: "Pending", guarantorId: "G-301" },
  { id: "APP-101", borrowerId: "B-1002", amount: 8000, duration: "6 months", purpose: "School fees", status: "Pending", guarantorId: "G-302" },
  { id: "APP-102", borrowerId: "B-1003", amount: 12000, duration: "10 months", purpose: "Car repair", status: "More Info Requested", guarantorId: "G-303" },
];

export const activeLoans = [
  { id: "LN-700", borrowerId: "B-1001", principal: 15000, interestRate: 14, outstanding: 9800, nextDue: "2026-05-03", status: "Active", disbursed: true, disbursedDate: "2026-04-02", disbursementMethod: "Bank Transfer", transferRef: "TRX-55101" },
  { id: "LN-701", borrowerId: "B-1002", principal: 8000, interestRate: 12, outstanding: 6400, nextDue: "2026-04-30", status: "Overdue", disbursed: true, disbursedDate: "2026-03-15", disbursementMethod: "Mobile Money", transferRef: "MOMO-228" },
];

export const repayments = [
  { id: "PAY-11", loanId: "LN-700", dueDate: "2026-04-25", paidDate: "2026-04-24", amountDue: 1800, paidAmount: 1800, status: "Paid" },
  { id: "PAY-12", loanId: "LN-701", dueDate: "2026-04-20", paidDate: "", amountDue: 1500, paidAmount: 700, status: "Partial" },
  { id: "PAY-13", loanId: "LN-701", dueDate: "2026-04-10", paidDate: "", amountDue: 1500, paidAmount: 0, status: "Unpaid" },
];

export const guarantors = [
  { id: "G-301", name: "Peter Ndeitunga", phone: "+264814001122", address: "Windhoek West", linkedLoans: ["LN-700"] },
  { id: "G-302", name: "Helena Kauta", phone: "+264814884422", address: "Katutura", linkedLoans: ["LN-701"] },
  { id: "G-303", name: "Samuel Tjombe", phone: "+264813778899", address: "Khomasdal", linkedLoans: [] },
];

export const documents = [
  { id: "DOC-1", borrowerId: "B-1001", type: "ID Card", fileName: "amara_id.pdf" },
  { id: "DOC-2", borrowerId: "B-1001", type: "Signed Agreement", fileName: "ln700_agreement.pdf" },
  { id: "DOC-3", borrowerId: "B-1002", type: "Utility Bill", fileName: "jonas_utility.pdf" },
];

export const staffAccounts = [
  { id: "STAFF-1", name: "Admin", role: "Super Admin", twoFactor: true, lastLogin: "2026-04-29" },
  { id: "STAFF-2", name: "Mercy", role: "Loan Officer", twoFactor: false, lastLogin: "2026-04-28" },
  { id: "STAFF-3", name: "Kavi", role: "Collections", twoFactor: false, lastLogin: "2026-04-28" },
];

export const activityLogs = [
  { id: 1, action: "Approved APP-100", actor: "Admin", time: "2026-04-29 09:05" },
  { id: 2, action: "Sent overdue reminder to B-1002", actor: "Mercy", time: "2026-04-29 10:11" },
  { id: 3, action: "Updated default interest rate", actor: "Admin", time: "2026-04-28 17:40" },
];
