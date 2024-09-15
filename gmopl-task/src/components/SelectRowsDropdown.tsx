import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface SelectRowsDropdownProps {
    onSelectRows: (count: number) => void;
}

export default function SelectRowsDropdown({ onSelectRows }: SelectRowsDropdownProps) {
    const [selectionCount, setSelectionCount] = useState<number | ''>('');
    const overlayPanelRef = useRef<OverlayPanel>(null);

    const handleSubmit = () => {
        if (selectionCount !== '') {
            onSelectRows(selectionCount);
            if (overlayPanelRef.current) {
                overlayPanelRef.current.hide();
            }
        }
    };

    return (
        <div className="flex items-center">
            <Button
                icon="pi pi-caret-down"
                className="p-button-text bg-slate-100"
                onClick={(e) => overlayPanelRef.current && overlayPanelRef.current.toggle(e)}
            />

            <OverlayPanel ref={overlayPanelRef} style={{ width: '200px' }}>
                <div className="p-2">
                    <input
                        type="number"
                        placeholder="Select rows..."
                        value={selectionCount}
                        onChange={(e) => setSelectionCount(e.target.value ? parseInt(e.target.value, 10) : '')}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full"
                    >
                        Submit
                    </button>
                </div>
            </OverlayPanel>
        </div>
    );
}
