'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Warning, PaperPlaneTilt, SpinnerGap } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitWhistleblowerReport, WhistleblowerCategory } from '@/lib/actions/whistleblower';
import { toast } from 'sonner';
import { colors } from '@/lib/design-system';

interface WhistleblowerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const categories: { value: WhistleblowerCategory; label: string }[] = [
    { value: 'fraud', label: 'Financial Fraud' },
    { value: 'misconduct', label: 'Misconduct' },
    { value: 'safety', label: 'Health & Safety Violation' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'corruption', label: 'Corruption' },
    { value: 'other', label: 'Other Concern' },
];

export function WhistleblowerModal({ isOpen, onClose }: WhistleblowerModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        category: '' as WhistleblowerCategory | '',
        subject: '',
        description: '',
        incidentDate: '',
        department: '',
        involvedParties: '',
        evidence: '',
        contactEmail: '',
        isAnonymous: true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.category || !formData.subject || !formData.description) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        const result = await submitWhistleblowerReport({
            category: formData.category as WhistleblowerCategory,
            subject: formData.subject,
            description: formData.description,
            incidentDate: formData.incidentDate || undefined,
            department: formData.department || undefined,
            involvedParties: formData.involvedParties || undefined,
            evidence: formData.evidence || undefined,
            contactEmail: formData.contactEmail || undefined,
            isAnonymous: formData.isAnonymous,
        });

        setIsSubmitting(false);

        if (result.success) {
            toast.success(
                <div className="space-y-1">
                    <p className="font-semibold">Report Submitted Successfully</p>
                    <p className="text-sm text-gray-600">Reference: {result.referenceNumber}</p>
                    <p className="text-xs text-gray-500">Save this reference number for future inquiries.</p>
                </div>
            );
            // Reset form
            setFormData({
                category: '',
                subject: '',
                description: '',
                incidentDate: '',
                department: '',
                involvedParties: '',
                evidence: '',
                contactEmail: '',
                isAnonymous: true,
            });
            onClose();
        } else {
            toast.error(result.error || 'Failed to submit report');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div
                            className="px-6 py-4 text-white flex items-center justify-between"
                            style={{
                                background: `linear-gradient(to right, ${colors.primary.green.DEFAULT}, ${colors.primary.green[600]})`
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6" weight="fill" />
                                <div>
                                    <h2 className="text-lg font-bold">Report a Concern</h2>
                                    <p className="text-green-100 text-xs">Your identity is protected</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                            {/* Anonymous notice */}
                            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                                <Warning className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-amber-800">
                                    All reports are treated confidentially. You may choose to remain anonymous or provide contact details for follow-up.
                                </p>
                            </div>

                            {/* Category */}
                            <div className="space-y-1.5">
                                <Label htmlFor="category" className="text-sm font-medium">
                                    Category <span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as WhistleblowerCategory })}
                                    className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select a category...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Subject */}
                            <div className="space-y-1.5">
                                <Label htmlFor="subject" className="text-sm font-medium">
                                    Subject <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="Brief summary of the concern"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                                <Label htmlFor="description" className="text-sm font-medium">
                                    Description <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Provide details about the concern, including what happened, when, and where..."
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* Incident Date & Department */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor="incidentDate" className="text-sm font-medium">
                                        Date of Incident
                                    </Label>
                                    <Input
                                        id="incidentDate"
                                        type="date"
                                        value={formData.incidentDate}
                                        onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="department" className="text-sm font-medium">
                                        Department
                                    </Label>
                                    <Input
                                        id="department"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        placeholder="If applicable"
                                    />
                                </div>
                            </div>

                            {/* Involved Parties */}
                            <div className="space-y-1.5">
                                <Label htmlFor="involvedParties" className="text-sm font-medium">
                                    Individuals/Entities Involved
                                </Label>
                                <Input
                                    id="involvedParties"
                                    value={formData.involvedParties}
                                    onChange={(e) => setFormData({ ...formData, involvedParties: e.target.value })}
                                    placeholder="Names or descriptions (optional)"
                                />
                            </div>

                            {/* Evidence */}
                            <div className="space-y-1.5">
                                <Label htmlFor="evidence" className="text-sm font-medium">
                                    Supporting Evidence
                                </Label>
                                <Textarea
                                    id="evidence"
                                    value={formData.evidence}
                                    onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                                    placeholder="Describe any documents, witnesses, or other evidence (optional)"
                                    rows={2}
                                />
                            </div>

                            {/* Contact & Anonymous toggle */}
                            <div className="space-y-3 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="isAnonymous"
                                        checked={formData.isAnonymous}
                                        onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <Label htmlFor="isAnonymous" className="text-sm cursor-pointer">
                                        Submit anonymously
                                    </Label>
                                </div>

                                {!formData.isAnonymous && (
                                    <div className="space-y-1.5">
                                        <Label htmlFor="contactEmail" className="text-sm font-medium">
                                            Contact Email
                                        </Label>
                                        <Input
                                            id="contactEmail"
                                            type="email"
                                            value={formData.contactEmail}
                                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                            placeholder="For follow-up communications"
                                        />
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
                            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-200"
                                style={{ backgroundColor: colors.primary.green.DEFAULT }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <SpinnerGap className="w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <PaperPlaneTilt className="w-4 h-4" />
                                        Submit Report
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
