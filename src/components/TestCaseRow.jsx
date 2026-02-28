import { useRef, useEffect } from 'react';
import { TrashIcon } from './Icons';

const AutoExpandingTextarea = ({ value, onChange, placeholder, className, minRows = 1 }) => {
    const textareaRef = useRef(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            rows={minRows}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`${className} transition-all resize-none overflow-hidden block w-full`}
            style={{ minHeight: '38px' }}
        />
    );
};

export default function TestCaseRow({ testCase, onChange, onDelete }) {
    const handleChange = (field, value) => {
        onChange(testCase.id, { ...testCase, [field]: value });
    };

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-4 py-4 min-w-[80px] align-middle text-center">
                <span className="font-mono text-sm font-bold text-[#079046] bg-[#079046]/5 px-2 py-1 rounded min-w-[60px] inline-block border border-[#079046]/10">{testCase.id}</span>
            </td>
            <td className="px-4 py-4 min-w-[250px] align-middle">
                <AutoExpandingTextarea
                    value={testCase.name}
                    placeholder="Test case name"
                    onChange={(val) => handleChange('name', val)}
                    className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-[#079046] focus:bg-white"
                />
            </td>
            <td className="px-4 py-4 min-w-[250px] align-middle">
                <AutoExpandingTextarea
                    value={testCase.description}
                    placeholder="Description"
                    onChange={(val) => handleChange('description', val)}
                    className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-[#079046] focus:bg-white"
                />
            </td>
            <td className="px-4 py-4 min-w-[250px] align-middle">
                <AutoExpandingTextarea
                    value={testCase.preconditions}
                    placeholder="Preconditions"
                    onChange={(val) => handleChange('preconditions', val)}
                    className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-[#079046] focus:bg-white"
                />
            </td>
            <td className="px-4 py-4 min-w-[300px] align-middle">
                <AutoExpandingTextarea
                    value={testCase.steps}
                    placeholder="Test steps"
                    onChange={(val) => handleChange('steps', val)}
                    className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-[#079046] focus:bg-white"
                />
            </td>
            <td className="px-4 py-4 min-w-[250px] align-middle">
                <AutoExpandingTextarea
                    value={testCase.inputData}
                    placeholder="Input data"
                    onChange={(val) => handleChange('inputData', val)}
                    className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-[#079046] focus:bg-white"
                />
            </td>
            <td className="px-4 py-4 min-w-[250px] align-middle">
                <AutoExpandingTextarea
                    value={testCase.expected}
                    placeholder="Expected result"
                    onChange={(val) => handleChange('expected', val)}
                    className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-[#079046] focus:bg-white"
                />
            </td>
            <td className="px-4 py-4 min-w-[250px] align-middle">
                <AutoExpandingTextarea
                    value={testCase.actual}
                    placeholder="Actual result"
                    onChange={(val) => handleChange('actual', val)}
                    className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-[#079046] focus:bg-white"
                />
            </td>
            <td className="px-4 py-4 min-w-[150px] align-middle">
                <select
                    value={testCase.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-[#079046] focus:bg-white transition-all h-[38px]"
                >
                    <option value="">Not Tested</option>
                    <option value="Passed">✓ Passed</option>
                    <option value="Failed">✗ Failed</option>
                    <option value="Blocked">⚠ Blocked</option>
                </select>
            </td>
            <td className="px-4 py-4 min-w-[160px] align-middle">
                <input
                    type="date"
                    value={testCase.execDate}
                    onChange={(e) => handleChange('execDate', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-[#079046] focus:bg-white h-[38px] transition-all"
                />
            </td>
            <td className="px-4 py-4 min-w-[80px] align-middle text-center">
                <button type="button" onClick={() => onDelete(testCase.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
}
