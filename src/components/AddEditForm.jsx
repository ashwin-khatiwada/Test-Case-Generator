import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeftIcon, PlusIcon, CheckIcon, ClipboardIcon } from './Icons';
import TestCaseRow from './TestCaseRow';

function createBlankTestCase(prefix, counter) {
    return {
        id: `${prefix || 'TC'}_${String(counter).padStart(2, '0')}`,
        name: '',
        description: '',
        preconditions: '',
        steps: '',
        inputData: '',
        expected: '',
        actual: '',
        status: '',
        execDate: '',
    };
}

export default function AddEditForm({ plan, isEditing, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: '', module: '', idPrefix: '', tester: '',
        executionDate: '', description: '', prerequisites: '', environment: '',
    });
    const [testCases, setTestCases] = useState([]);
    const counterRef = useRef(0);

    useEffect(() => {
        if (plan && isEditing) {
            setFormData({
                name: plan.name || '',
                module: plan.module || '',
                idPrefix: plan.idPrefix || '',
                tester: plan.tester || '',
                executionDate: plan.executionDate || '',
                description: plan.description || '',
                prerequisites: plan.prerequisites || '',
                environment: plan.environment || '',
            });
            setTestCases(plan.testCases || []);

            const maxId = (plan.testCases || []).reduce((max, tc) => {
                const num = parseInt(tc.id.split('_')[1]) || 0;
                return Math.max(max, num);
            }, 0);
            counterRef.current = maxId;
        }
    }, [plan, isEditing]);

    const handleFieldChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === 'idPrefix') {
            setTestCases(prev => prev.map((tc, index) => ({
                ...tc,
                id: `${value || 'TC'}_${String(index + 1).padStart(2, '0')}`
            })));
        }
    };

    const addTestCase = useCallback(() => {
        counterRef.current++;
        const newTc = createBlankTestCase(formData.idPrefix, counterRef.current);
        setTestCases((prev) => [...prev, newTc]);
    }, [formData.idPrefix]);

    const updateTestCase = useCallback((id, updated) => {
        setTestCases((prev) => prev.map((tc) => (tc.id === id ? updated : tc)));
    }, []);

    const deleteTestCase = useCallback((id) => {
        setTestCases((prev) => {
            const filtered = prev.filter((tc) => tc.id !== id);
            const renamed = filtered.map((tc, index) => ({
                ...tc,
                id: `${formData.idPrefix || 'TC'}_${String(index + 1).padStart(2, '0')}`
            }));
            counterRef.current = renamed.length;
            return renamed;
        });
    }, [formData.idPrefix]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, testCases });
    };

    return (
        <div className="fade-in">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onCancel} className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{isEditing ? 'Edit Test Plan' : 'Add New Test Plan'}</h2>
                    <p className="text-slate-500">Fill in the details below</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800">Test Plan Information</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Test Plan Name" required>
                            <input
                                type="text" required value={formData.name}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-400 focus:bg-white transition-all duration-200"
                                placeholder="e.g., Login Module Tests"
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                            />
                        </FormField>
                        <FormField label="Module Name" required>
                            <input
                                type="text" required value={formData.module}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-400 focus:bg-white transition-all duration-200"
                                placeholder="e.g., Authentication"
                                onChange={(e) => handleFieldChange('module', e.target.value)}
                            />
                        </FormField>
                        <FormField label="Test Case ID Prefix" required>
                            <input
                                type="text" required value={formData.idPrefix}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-400 focus:bg-white transition-all duration-200"
                                placeholder="e.g., MT"
                                onChange={(e) => handleFieldChange('idPrefix', e.target.value)}
                            />
                        </FormField>
                        <FormField label="Tester Name" required>
                            <input
                                type="text" required value={formData.tester}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-400 focus:bg-white transition-all duration-200"
                                placeholder="e.g., John Doe"
                                onChange={(e) => handleFieldChange('tester', e.target.value)}
                            />
                        </FormField>
                        <FormField label="Execution Date">
                            <input
                                type="date" value={formData.executionDate}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-400 focus:bg-white transition-all duration-200"
                                onChange={(e) => handleFieldChange('executionDate', e.target.value)}
                            />
                        </FormField>
                        <div className="md:col-span-2">
                            <FormField label="Description">
                                <textarea
                                    rows="3" value={formData.description}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-400 focus:bg-white transition-all duration-200 resize-none"
                                    placeholder="Describe the test plan..."
                                    onChange={(e) => handleFieldChange('description', e.target.value)}
                                />
                            </FormField>
                        </div>
                        <FormField label="Prerequisites">
                            <textarea
                                rows="3" value={formData.prerequisites}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-400 focus:bg-white transition-all duration-200 resize-none"
                                placeholder="List prerequisites..."
                                onChange={(e) => handleFieldChange('prerequisites', e.target.value)}
                            />
                        </FormField>
                        <FormField label="Environment">
                            <textarea
                                rows="3" value={formData.environment}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-400 focus:bg-white transition-all duration-200 resize-none"
                                placeholder="e.g., Browser: Chrome 120, OS: Windows 11"
                                onChange={(e) => handleFieldChange('environment', e.target.value)}
                            />
                        </FormField>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-slate-800">Test Cases</h3>
                        <button type="button" onClick={addTestCase} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2">
                            <PlusIcon className="w-4 h-4" /> Add Test Case
                        </button>
                    </div>
                    <div className="table-container overflow-auto max-h-[60vh]">
                        <table className="w-full min-w-[2450px] border-collapse">
                            <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    {[
                                        { label: 'ID', width: '80px' },
                                        { label: 'Name', width: '250px' },
                                        { label: 'Description', width: '250px' },
                                        { label: 'Preconditions', width: '250px' },
                                        { label: 'Test Steps', width: '300px' },
                                        { label: 'Input Data', width: '250px' },
                                        { label: 'Expected', width: '250px' },
                                        { label: 'Actual', width: '250px' },
                                        { label: 'Status', width: '150px' },
                                        { label: 'Exec Date', width: '160px' },
                                        { label: 'Actions', width: '80px' }
                                    ].map((h) => (
                                        <th key={h.label} style={{ width: h.width, minWidth: h.width }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-200 bg-slate-50">
                                            {h.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {testCases.map((tc) => (
                                    <TestCaseRow key={tc.id} testCase={tc} onChange={updateTestCase} onDelete={deleteTestCase} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {testCases.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                                <ClipboardIcon className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-500 mb-4">No test cases added yet</p>
                            <button type="button" onClick={addTestCase} className="text-blue-500 hover:text-blue-600 font-medium">+ Add your first test case</button>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200">
                        Cancel
                    </button>
                    <button type="submit" className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" /> <span>{isEditing ? 'Save Changes' : 'Save Test Plan'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

function FormField({ label, required, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}
