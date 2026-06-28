'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ShieldCheck, Eye, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    listWhistleblowerReports,
    deleteWhistleblowerReport,
    WhistleblowerReport,
    WhistleblowerStatus
} from '@/lib/actions/whistleblower';
import { toast } from 'sonner';
import { colors } from '@/lib/design-system';

const statusColors: Record<WhistleblowerStatus, string> = {
    new: 'bg-blue-100 text-blue-700',
    reviewing: 'bg-yellow-100 text-yellow-700',
    investigating: 'bg-orange-100 text-orange-700',
    resolved: 'bg-green-100 text-green-700',
    dismissed: 'bg-gray-100 text-gray-700',
};

const categoryLabels: Record<string, string> = {
    fraud: 'Financial Fraud',
    misconduct: 'Misconduct',
    safety: 'Health & Safety',
    harassment: 'Harassment',
    corruption: 'Corruption',
    other: 'Other',
};

export default function WhistleblowerAdminPage() {
    const [reports, setReports] = useState<WhistleblowerReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<WhistleblowerStatus | 'all'>('all');

    useEffect(() => {
        fetchReports();
    }, [statusFilter]);

    const fetchReports = async () => {
        setLoading(true);
        const result = await listWhistleblowerReports(
            statusFilter !== 'all' ? { status: statusFilter } : undefined
        );
        if (result.success && result.data) {
            setReports(result.data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this report?')) return;

        const result = await deleteWhistleblowerReport(id);
        if (result.success) {
            toast.success('Report deleted');
            fetchReports();
        } else {
            toast.error(result.error || 'Failed to delete report');
        }
    };

    const filteredReports = reports.filter(report =>
        report.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${colors.primary.green.DEFAULT}15` }}>
                        <ShieldCheck className="w-6 h-6" style={{ color: colors.primary.green.DEFAULT }} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Whistleblower Reports</h1>
                        <p className="text-sm text-gray-500">Manage and review submitted concerns</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                        {reports.filter(r => r.status === 'new').length} new
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search by reference or subject..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as WhistleblowerStatus | 'all')}
                        className="h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="investigating">Investigating</option>
                        <option value="resolved">Resolved</option>
                        <option value="dismissed">Dismissed</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: colors.primary.green.DEFAULT, borderTopColor: 'transparent' }} />
                    </div>
                ) : filteredReports.length === 0 ? (
                    <div className="text-center py-12">
                        <ShieldCheck className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">No reports found</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Reference</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Submitted</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-mono text-sm">
                                        {report.referenceNumber}
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{categoryLabels[report.category] || report.category}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-[200px] truncate" title={report.subject}>
                                            {report.subject}
                                        </div>
                                        {report.isAnonymous && (
                                            <span className="text-xs text-gray-400">Anonymous</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${report.status !== 'resolved' ? statusColors[report.status] : ''}`}
                                            style={report.status === 'resolved' ? { backgroundColor: `${colors.primary.green.DEFAULT}15`, color: colors.primary.green.DEFAULT } : undefined}
                                        >
                                            {report.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                        {format(new Date(report.createdAt), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/whistleblower/${report.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(report.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
