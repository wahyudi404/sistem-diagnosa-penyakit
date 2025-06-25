'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { GejalaCreateProps } from '@/types/keputusan';

interface ComboBoxProps {
    data: GejalaCreateProps[];
    value: string;
    setValue: (value: string) => void;
}

export function CreateComboBoxGejalaComponent({ data, value, setValue }: ComboBoxProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    // Filter berdasarkan nama_gejala (label)
    const filteredData = data.filter((item) => item.nama_gejala.toLowerCase().includes(search.toLowerCase()));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {value ? data.find((item) => item.kode_gejala === value)?.nama_gejala : 'Cari data gejala...'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder="Cari data gejala..."
                        className="h-9"
                        value={search}
                        onValueChange={setSearch} // Update state pencarian
                    />
                    <CommandList>
                        <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                            {filteredData.map((item) => (
                                <CommandItem
                                    key={item.kode_gejala}
                                    value={item.nama_gejala} // Nilai yang dicari adalah nama_gejala
                                    onSelect={() => {
                                        setValue(item.kode_gejala === value ? '' : item.kode_gejala); // Simpan kode sebagai value
                                        setOpen(false);
                                    }}
                                >
                                    {item.nama_gejala}
                                    <Check className={cn('ml-auto', value === item.kode_gejala ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
