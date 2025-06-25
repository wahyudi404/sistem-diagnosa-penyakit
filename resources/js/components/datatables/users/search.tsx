'use client';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce'; // Optional: for debouncing
import { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import FormAdd from './form-add';

interface DataTableSearchProps<TData> {
    table: Table<TData>;
    placeholder?: string;
    className?: string;
    debounceTime?: number; // Optional: debounce delay in ms
}
const DataTableSearch = <TData,>({
    table,
    placeholder = 'Search all columns...',
    className = 'max-w-sm',
    debounceTime = 300,
}: DataTableSearchProps<TData>) => {
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebounce(searchValue, debounceTime); // Optional debounce

    useEffect(() => {
        table.setGlobalFilter(debouncedSearchValue);
    }, [debouncedSearchValue, table]);

    return (
        <div className="flex items-center justify-between py-4">
            <Input
                type="search"
                placeholder={placeholder}
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className={className}
            />

            <FormAdd/>
        </div>
    );
};

export default DataTableSearch;
