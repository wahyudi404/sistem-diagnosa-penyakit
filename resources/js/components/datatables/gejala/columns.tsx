/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { Toast } from '@/components/alerts/toast';
import { ButtonGhost } from '@/components/button-ghost';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';

export type Gejala = {
    id: string;
    nama_gejala: string;
};

export const columns: ColumnDef<Gejala>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <ButtonGhost column={column} label="Kode" />,
    },
    {
        accessorKey: 'nama_gejala',
        header: ({ column }) => <ButtonGhost column={column} label="Gejala Penyakit" />,
    },
    {
        accessorKey: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const gejala = row.original;
            const [open, setOpen] = useState(false);
            const [openDropdown, setOpenDropdown] = useState(false);

            const { delete: destroy } = useForm();

            const handleDelete = () => {
                destroy(route('gejala.destroy', gejala.id), {
                    onSuccess: () => {
                        Toast.fire({
                            title: 'Data gejala berhasil dihapus',
                            icon: 'success',
                        });
                    },
                    onError: () => {
                        Toast.fire({
                            title: 'Data gejala gagal dihapus',
                            icon: 'error',
                        });
                    },
                    onFinish: () => {
                        setOpen(false);
                        setOpenDropdown(false);
                    },
                });
                setTimeout(() => setOpen(false), 100); // beri jeda agar Radix bisa handle focus dengan benar
            };
            return (
                <>
                    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={route('gejala.edit', gejala.id)}>
                                    <Edit className="mr-2 text-yellow-500" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setOpenDropdown(false);
                                    setOpen(true);
                                }}
                            >
                                <Trash className="mr-2 text-red-500" />
                                Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                <DialogDescription>
                                    Apakah Anda yakin ingin menghapus gejala <strong>{gejala.nama_gejala}</strong>?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="secondary" onClick={() => setOpen(false)}>
                                    Batal
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    Hapus
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
    },
];
