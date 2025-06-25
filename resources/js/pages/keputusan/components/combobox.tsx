'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { PenyakitCreateProps } from '@/types/keputusan';

interface ComboBoxProps {
    penyakits: PenyakitCreateProps[];
    onChangeComboBox?: (value: string) => void;
}

export function CreateComboBoxComponent({ penyakits, onChangeComboBox }: ComboBoxProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [search, setSearch] = React.useState('');

    // Filter berdasarkan nama_penyakit (label)
    const filteredPenyakits = penyakits.filter((penyakit) => penyakit.nama_penyakit.toLowerCase().includes(search.toLowerCase()));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {value ? penyakits.find((penyakit) => penyakit.kode === value)?.nama_penyakit : 'Cari data penyakit...'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder="Cari data penyakit..."
                        className="h-9"
                        value={search}
                        onValueChange={setSearch} // Update state pencarian
                    />
                    <CommandList>
                        <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                        <CommandGroup>
                            {filteredPenyakits.map((penyakit) => (
                                <CommandItem
                                    key={penyakit.kode}
                                    value={penyakit.nama_penyakit} // Nilai yang dicari adalah nama_penyakit
                                    onSelect={() => {
                                        setValue(penyakit.kode === value ? '' : penyakit.kode); // Simpan kode sebagai value
                                        onChangeComboBox?.(penyakit.kode === value ? '' : penyakit.kode); // Panggil fungsi callback dengan kode penyakit
                                        setOpen(false);
                                    }}
                                >
                                    {penyakit.nama_penyakit}
                                    <Check className={cn('ml-auto', value === penyakit.kode ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
