// ─── Shared Mock Data ───────────────────────────────────────────────
import davidImg from '../../../assets/team/david.jpg';
import sarahImg from '../../../assets/team/sarah.jpg';
import michaelImg from '../../../assets/team/michael.jpg';

export const mockUser = {
  name: 'Marcus Johnson',
  email: 'marcus.johnson@email.com',
  phone: '+1 727-555-0192',
  avatar: davidImg,
  memberSince: 'January 2024',
};

export const myApplications = [
  { id: 'APP-2024-001', type: 'Fix & Flip', property: '1824 Oak Ave, Tampa FL', amount: '$285,000', status: 'approved', date: 'Feb 12, 2026', ltv: '70%' },
  { id: 'APP-2024-002', type: 'New Construction', property: '390 Pine Rd, Clearwater FL', amount: '$520,000', status: 'under_review', date: 'Apr 2, 2026', ltv: '65%' },
  { id: 'APP-2024-003', type: 'Cash-Out Refinance', property: '742 Maple Dr, Orlando FL', amount: '$180,000', status: 'pending', date: 'Apr 10, 2026', ltv: '72%' },
  { id: 'APP-2024-004', type: 'Fix & Lease', property: '215 Elm St, Sarasota FL', amount: '$210,000', status: 'rejected', date: 'Mar 5, 2026', ltv: '80%' },
];

export const myDocuments = [
  { name: 'Purchase Agreement – 1824 Oak Ave', size: '2.4 MB', date: 'Feb 10, 2026', type: 'pdf' },
  { name: 'Scope of Work – Tampa Project', size: '1.1 MB', date: 'Feb 10, 2026', type: 'pdf' },
  { name: 'Bank Statements – Jan 2026', size: '890 KB', date: 'Feb 10, 2026', type: 'pdf' },
  { name: 'Articles of Organization – MJ Investments LLC', size: '540 KB', date: 'Jan 15, 2026', type: 'pdf' },
  { name: 'ID Verification – Passport', size: '3.2 MB', date: 'Jan 15, 2026', type: 'img' },
];

export const notifications = [
  { id: 1, message: 'Your Fix & Flip application has been approved!', time: '2 hours ago', read: false, type: 'success' },
  { id: 2, message: 'Document request: Please upload your Q1 bank statements.', time: '1 day ago', read: false, type: 'warning' },
  { id: 3, message: 'Loan officer James assigned to your New Construction application.', time: '3 days ago', read: true, type: 'info' },
  { id: 4, message: 'Your application APP-2024-004 was not approved. Please contact us.', time: '1 month ago', read: true, type: 'error' },
];

export const adminUsers = [
  { id: 1, name: 'Marcus Johnson', email: 'marcus.j@email.com', phone: '+1 727-555-0192', apps: 4, status: 'active', joined: 'Jan 15, 2024', avatar: davidImg },
  { id: 2, name: 'Sandra Lee', email: 'sandra.lee@email.com', phone: '+1 813-555-0234', apps: 2, status: 'active', joined: 'Feb 3, 2024', avatar: sarahImg },
  { id: 3, name: 'David Okafor', email: 'd.okafor@email.com', phone: '+1 407-555-0178', apps: 7, status: 'active', joined: 'Mar 22, 2024', avatar: davidImg },
  { id: 4, name: 'Emily Chen', email: 'e.chen@email.com', phone: '+1 305-555-0291', apps: 1, status: 'suspended', joined: 'Apr 1, 2024', avatar: sarahImg },
  { id: 5, name: 'Robert Williams', email: 'r.williams@email.com', phone: '+1 941-555-0342', apps: 3, status: 'active', joined: 'Apr 10, 2024', avatar: michaelImg },
  { id: 6, name: 'Jasmine Torres', email: 'j.torres@email.com', phone: '+1 727-555-0409', apps: 5, status: 'active', joined: 'May 5, 2024', avatar: sarahImg },
];

export const adminApplications = [
  { id: 'APP-001', user: 'Marcus Johnson', type: 'Fix & Flip', property: '1824 Oak Ave, Tampa FL', amount: '$285,000', status: 'approved', date: 'Feb 12, 2026', ltv: '70%' },
  { id: 'APP-002', user: 'David Okafor', type: 'New Construction', property: '390 Pine Rd, Clearwater FL', amount: '$520,000', status: 'under_review', date: 'Apr 2, 2026', ltv: '65%' },
  { id: 'APP-003', user: 'Sandra Lee', type: 'Cash-Out Refinance', property: '742 Maple Dr, Orlando FL', amount: '$180,000', status: 'pending', date: 'Apr 10, 2026', ltv: '72%' },
  { id: 'APP-004', user: 'Emily Chen', type: 'Fix & Lease', property: '215 Elm St, Sarasota FL', amount: '$210,000', status: 'rejected', date: 'Mar 5, 2026', ltv: '80%' },
  { id: 'APP-005', user: 'Robert Williams', type: 'Fix & Flip', property: '88 Cedar Blvd, Miami FL', amount: '$395,000', status: 'approved', date: 'Apr 15, 2026', ltv: '68%' },
  { id: 'APP-006', user: 'Jasmine Torres', type: 'New Construction', property: '1100 Birch Way, Naples FL', amount: '$640,000', status: 'under_review', date: 'Apr 16, 2026', ltv: '60%' },
];

export const blogPosts = [
  { id: 1, title: 'When to Use Hard Money', category: 'Hard Money', status: 'published', date: 'Feb 13, 2026', views: 1204, author: 'Admin' },
  { id: 2, title: 'Fix & Flip Loans in Tampa, FL', category: 'Fix & Flip', status: 'published', date: 'Jan 20, 2026', views: 986, author: 'Admin' },
  { id: 3, title: 'Top 5 Global Markets for Fix and Flip in 2026', category: 'Market Insights', status: 'published', date: 'Dec 15, 2025', views: 2341, author: 'Admin' },
  { id: 4, title: 'Hard Money for Capital Stacking (Draft)', category: 'Strategy', status: 'draft', date: 'Apr 16, 2026', views: 0, author: 'Admin' },
  { id: 5, title: 'Understanding Bridge Loans vs Hard Money', category: 'Education', status: 'published', date: 'Dec 28, 2025', views: 754, author: 'Admin' },
];

export const statusMap = {
  approved:     { label: 'Approved',      color: 'bg-emerald-100 text-emerald-700' },
  under_review: { label: 'Under Review',  color: 'bg-blue-100 text-blue-700' },
  pending:      { label: 'Pending',       color: 'bg-amber-100 text-amber-700' },
  rejected:     { label: 'Rejected',      color: 'bg-red-100 text-red-700' },
};

export const statusMapFull = {
  approved:     { label: 'Approved',      color: 'bg-emerald-100 text-emerald-700', iconColor: 'text-emerald-500' },
  under_review: { label: 'Under Review',  color: 'bg-blue-100 text-blue-700',       iconColor: 'text-blue-500' },
  pending:      { label: 'Pending',       color: 'bg-amber-100 text-amber-700',     iconColor: 'text-amber-500' },
  rejected:     { label: 'Not Approved',  color: 'bg-red-100 text-red-700',         iconColor: 'text-red-500' },
};

