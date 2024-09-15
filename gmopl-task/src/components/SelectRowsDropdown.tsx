import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 


export default function SelectRowsDropdown({ onSelectRows }) {
    const [selectionCount, setSelectionCount] = useState('');
    const overlayPanelRef = useRef(null);

    const handleSubmit = () => {
        if (selectionCount) {
            onSelectRows(selectionCount);
            overlayPanelRef.current.hide(); // Close the dropdown after submitting
        }
    };

    return (
        <div className="flex items-center">
            <Button icon="pi pi-caret-down" className="p-button-text  bg-slate-100" onClick={(e) => overlayPanelRef.current.toggle(e)} />

            <OverlayPanel ref={overlayPanelRef} style={{ width: '200px' }}>
                <div className="p-2">
                    <input
                        type="number"
                        placeholder="Select rows..."
                        value={selectionCount}
                        onChange={(e) => setSelectionCount(e.target.value)}
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
