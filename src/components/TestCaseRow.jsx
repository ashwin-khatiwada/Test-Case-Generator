import { TrashIcon } from './Icons';

export default function TestCaseRow({ testCase, onChange, onDelete }) {
    const handleChange = (field, value) => {
        onChange(testCase.id, { ...testCase, [field]: value });
    };

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-4 py-3">
                <span className="font-mono text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{testCase.id}</span>
            </td>
            <td className="px-4 py-3">
                <input
                    type="text"
                    value={testCase.name}
                    placeholder="Test case name"
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-400 focus:bg-white"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="text"
                    value={testCase.description}
                    placeholder="Description"
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-400 focus:bg-white"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="text"
                    value={testCase.preconditions}
                    placeholder="Preconditions"
                    onChange={(e) => handleChange('preconditions', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-400 focus:bg-white"
                />
            </td>
            <td className="px-4 py-3">
                <textarea
                    placeholder="Test steps"
                    rows="2"
                    value={testCase.steps}
                    onChange={(e) => handleChange('steps', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-400 focus:bg-white resize-none"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="text"
                    value={testCase.inputData}
                    placeholder="Input data"
                    onChange={(e) => handleChange('inputData', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-400 focus:bg-white"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="text"
                    value={testCase.expected}
                    placeholder="Expected result"
                    onChange={(e) => handleChange('expected', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-400 focus:bg-white"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="text"
                    value={testCase.actual}
                    placeholder="Actual result"
                    onChange={(e) => handleChange('actual', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-400 focus:bg-white"
                />
            </td>
            <td className="px-4 py-3">
                <select
                    value={testCase.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-400 focus:bg-white"
                >
                    <option value="">Select</option>
                    <option value="Passed">✓ Passed</option>
                    <option value="Failed">✗ Failed</option>
                    <option value="Blocked">⚠ Blocked</option>
                </select>
            </td>
            <td className="px-4 py-3">
                <input
                    type="date"
                    value={testCase.execDate}
                    onChange={(e) => handleChange('execDate', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-400 focus:bg-white"
                />
            </td>
            <td className="px-4 py-3">
                <button type="button" onClick={() => onDelete(testCase.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
}
