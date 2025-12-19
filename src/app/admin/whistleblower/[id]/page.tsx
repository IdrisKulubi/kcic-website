'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import {
    ArrowLeft,
    ShieldCheck,
    Calendar,
    Building,
    Users,
    Mail,
    FileText,
    Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    getWhistleblowerReport,
    updateReportStatus,
    WhistleblowerReport,
    WhistleblowerStatus
} from '@/lib/actions/whistleblower';
import { toast } from 'sonner';
import { colors } from '@/lib/design-system';

const statusOptions: { value: WhistleblowerStatus; label: string; color: string }[] = [
    { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
    { value: 'reviewing', label: 'Reviewing', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'investigating', label: 'Investigating', color: 'bg-orange-100 text-orange-700' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-700' }, // This will be handled by inline style in the render
    { value: 'dismissed', label: 'Dismissed', color: 'bg-gray-100 text-gray-700' },
];

const categoryLabels: Record<string, string> = {
    fraud: 'Financial Fraud',
    misconduct: 'Misconduct',
    safety: 'Health & Safety Violation',
    harassment: 'Harassment',
    corruption: 'Corruption',
    other: 'Other Concern',
};

export default function WhistleblowerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [report, setReport] = useState<WhistleblowerReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<WhistleblowerStatus>('new');
    const [adminNotes, setAdminNotes] = useState('');

    useEffect(() => {
        if (id) fetchReport();
    }, [id]);

    const fetchReport = async () => {
        setLoading(true);
        const result = await getWhistleblowerReport(id);
        if (result.success && result.data) {
            setReport(result.data);
            setStatus(result.data.status);
            setAdminNotes(result.data.adminNotes || '');
        } else {
            toast.error(result.error || 'Report not found');
            router.push('/admin/whistleblower');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const result = await updateReportStatus(id, {
            status,
            adminNotes,
            reviewedBy: 'Admin', // In production, use actual admin name
        });

        if (result.success) {
            toast.success('Report updated successfully');
            fetchReport();
        } else {
            toast.error(result.error || 'Failed to update report');
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div
                    className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: colors.primary.green.DEFAULT, borderTopColor: 'transparent' }}
                />
            </div>
        );
    }

    if (!report) {
        return null;
    }

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/whistleblower">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${colors.primary.green.DEFAULT}15` }}>
                            <ShieldCheck className="w-5 h-5" style={{ color: colors.primary.green.DEFAULT }} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{report.referenceNumber}</h1>
                            <p className="text-sm text-gray-500">
                                Submitted {format(new Date(report.createdAt), 'MMMM d, yyyy \'at\' h:mm a')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Report Details */}
                    <div className="bg-white rounded-xl border p-6 space-y-5">
                        <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</span>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {categoryLabels[report.category] || report.category}
                            </p>
                        </div>

                        <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</span>
                            <p className="mt-1 text-lg font-semibold text-gray-900">{report.subject}</p>
                        </div>

                        <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</span>
                            <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {report.description}
                            </p>
                        </div>

                        {report.evidence && (
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Supporting Evidence</span>
                                <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{report.evidence}</p>
                            </div>
                        )}
                    </div>

                    {/* Additional Context */}
                    <div className="bg-white rounded-xl border p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Additional Information</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {report.incidentDate && (
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <span className="text-xs text-gray-500">Incident Date</span>
                                        <p className="text-sm text-gray-900">{format(new Date(report.incidentDate), 'MMMM d, yyyy')}</p>
                                    </div>
                                </div>
                            )}
                            {report.department && (
                                <div className="flex items-start gap-3">
                                    <Building className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <span className="text-xs text-gray-500">Department</span>
                                        <p className="text-sm text-gray-900">{report.department}</p>
                                    </div>
                                </div>
                            )}
                            {report.involvedParties && (
                                <div className="flex items-start gap-3 sm:col-span-2">
                                    <Users className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <span className="text-xs text-gray-500">Involved Parties</span>
                                        <p className="text-sm text-gray-900">{report.involvedParties}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status & Actions */}
                    <div className="bg-white rounded-xl border p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900">Manage Report</h3>

                        <div className="space-y-2">
                            <Label className="text-xs">Status</Label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as WhistleblowerStatus)}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                {statusOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs">Admin Notes</Label>
                            <Textarea
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Add internal notes about this report..."
                                rows={4}
                            />
                        </div>

                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-200"
                            style={{ backgroundColor: colors.primary.green.DEFAULT }}
                        >
                            {saving ? (
                                <>Saving...</>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Reporter Info */}
                    <div className="bg-white rounded-xl border p-6 space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Reporter Information</h3>

                        {report.isAnonymous ? (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Anonymous Report</span>
                            </div>
                        ) : report.contactEmail ? (
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <a href={`mailto:${report.contactEmail}`} className="text-sm hover:underline" style={{ color: colors.primary.green.DEFAULT }}>
                                    {report.contactEmail}
                                </a>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No contact information provided</p>
                        )}
                    </div>

                    {/* Review History */}
                    {report.reviewedAt && (
                        <div className="bg-gray-50 rounded-xl border p-4 text-sm">
                            <p className="text-gray-500">
                                Last reviewed by <span className="font-medium text-gray-700">{report.reviewedBy || 'Admin'}</span>
                            </p>
                            <p className="text-gray-400 text-xs">
                                {format(new Date(report.reviewedAt), 'MMM d, yyyy \'at\' h:mm a')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
