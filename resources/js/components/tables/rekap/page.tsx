import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RekapPenyakits, RekapsProps } from '@/types/rekap';
import { formatDateTime } from '@/utils/dateFormatters';
import { router } from '@inertiajs/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { EyeIcon, Loader2Icon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Page = ({ rekaps, role_id }: { rekaps: RekapsProps[]; role_id: number }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [tanggal, setTanggal] = useState('');
    const [rekapPenyakits, setRekapPenyakits] = useState<RekapPenyakits[]>([]);

    const handleDelete = (id: number) => {
        setLoading(true);
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: 'Data akan dihapus secara permanen!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            theme: 'dark',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('rekap.destroy', id), {
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            text: 'Data berhasil dihapus',
                            showConfirmButton: false,
                            timer: 1500,
                            toast: true,
                            theme: 'dark',
                            position: 'top-end',
                        });
                    },
                    onError: (error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.message,
                            showConfirmButton: false,
                            timer: 1500,
                            toast: true,
                            theme: 'dark',
                            position: 'top-end',
                        });
                    },
                    onFinish: () => {
                        setLoading(false);
                    },
                });
            } else {
                setLoading(false);
            }
        });
    };

    const openDialog = (created_at: string, rekap_penyakits: RekapPenyakits[]) => {
        setRekapPenyakits(rekap_penyakits);
        setTanggal(formatDateTime(created_at, 'id-ID'));
        setOpen(true);
    };

    return (
        <Table className="w-full rounded-2xl">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    style={{
                        width: '90vw',
                        maxWidth: '800px',
                        height: '85vh',
                        overflowY: 'auto',
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Hasil Diagnosa</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm">{tanggal}</DialogDescription>
                    </DialogHeader>

                    <Accordion type="single" collapsible>
                        {rekapPenyakits.map((rekapPenyakit, index) => (
                            <AccordionItem key={index} value={'item-' + index}>
                                <AccordionTrigger>{rekapPenyakit.penyakit.nama_penyakit} - [{rekapPenyakit.persentase}%]</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm font-normal">
                                        Hasil pemeriksaan menunjukkan <b>{rekapPenyakit.persentase}%</b> kemungkinan terdiagnosis{' '}
                                        <b>{rekapPenyakit.penyakit.nama_penyakit}</b>. Solusi penanganan yang direkomendasikan adalah:
                                        <br /> {rekapPenyakit.penyakit.solusi}.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </DialogContent>
            </Dialog>

            <TableHeader>
                <TableRow className="bg-muted/50 text-muted-foreground hover:bg-muted/50">
                    {role_id === 1 && <TableHead className="w-[25%] border text-center">Pengguna</TableHead>}
                    <TableHead className="w-[35%] border text-center">Gejala yang dialami</TableHead>
                    <TableHead className="w-[30%] border text-center">Tanggal Rekap</TableHead>
                    <TableHead className="w-[10%] border text-center">#</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rekaps.length ? (
                    rekaps.map((rekap, index) => (
                        <TableRow key={`${index}`} className="text-xs hover:bg-transparent">
                            {role_id === 1 && (
                                <TableCell className="border">
                                    <p>Nama: {rekap.name}</p>
                                    <p>Email: {rekap.email}</p>
                                    <p>Role: {rekap.role}</p>
                                </TableCell>
                            )}
                            <TableCell className="border">
                                <ul className="list-disc pl-5">
                                    {rekap.rekap_gejalas.map((r_gejala, idx_gejala) => (
                                        <li key={`${index}-${idx_gejala}`}>{r_gejala.gejala.nama_gejala}</li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell className="border">
                                <div className="text-xs">{formatDateTime(rekap.created_at, 'id-ID')}</div>
                            </TableCell>
                            <TableCell className="border">
                                <div className="flex gap-1">
                                    <Button
                                        onClick={() => openDialog(rekap.created_at, rekap.rekap_penyakits)}
                                        disabled={loading}
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="cursor-pointer"
                                    >
                                        {!loading ? <EyeIcon /> : <Loader2Icon className="animate-spin" />}
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(rekap.id)}
                                        disabled={loading}
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="cursor-pointer"
                                    >
                                        {!loading ? <TrashIcon /> : <Loader2Icon className="animate-spin" />}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="border text-center">
                            <p className="text-muted text-sm font-semibold">Data kosong</p>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default Page;
