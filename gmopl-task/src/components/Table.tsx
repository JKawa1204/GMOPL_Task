import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import SelectRowsDropdown from './SelectRowsDropdown'; 

export function Table() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const currentPage = first / rows + 1;
        fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${rows}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data);
                setTotalRecords(data.pagination.total);
            });
    }, [first, rows]);

    const onPageChange = (e) => {
        setFirst(e.first);
    };

    const handleSelectRows = async (selectionCount) => {
        let totalRowsToSelect = parseInt(selectionCount, 10);
        let selected = [...selectedProducts];
        let currentPage = first / rows + 1;

        while (totalRowsToSelect > 0) {
            const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${rows}`);
            const data = await response.json();
            const pageProducts = data.data;
            const remainingRows = totalRowsToSelect > pageProducts.length ? pageProducts.length : totalRowsToSelect;

            selected = [...selected, ...pageProducts.slice(0, remainingRows)].filter(
                (product, index, self) => self.findIndex(p => p.id === product.id) === index
            );

            totalRowsToSelect -= remainingRows;
            currentPage += 1;

            if (currentPage > Math.ceil(totalRecords / rows)) {
                break;
            }
        }

        setSelectedProducts(selected);
    };

    return (
        <div className="max-w-[1700px] mx-auto pt-5">
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <DataTable
                    value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id"
                    selectionMode="multiple"
                    className="w-full text-left table-auto min-w-max"
                >
                  
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

                  
                    <Column
                        header={() => (
                            <div className="flex items-center">
                               
                                <SelectRowsDropdown onSelectRows={handleSelectRows} />
                              
                            </div>
                        )}
                    ></Column>
                    <Column field="title" header="Title"></Column>
                    <Column field="place_of_origin" header="Place of Origin"></Column>
                    <Column field="artist_display" header="Artist Display"></Column>
                    <Column field="inscriptions" header="Inscriptions"></Column>
                    <Column field="date_start" header="Start Date"></Column>
                    <Column field="date_end" header="End Date"></Column>
                </DataTable>

                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={totalRecords}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
}
