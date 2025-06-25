import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RekapsProps } from '@/types/rekap';
import { formatDateTime } from '@/utils/dateFormatters';
import { router } from '@inertiajs/react';
import { Loader2Icon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';
const Page = ({ rekaps, role_id }: { rekaps: RekapsProps[]; role_id: number }) => {
    const [loading, setLoading] = useState(false);

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
    return (
        <Table className="w-full rounded-2xl">
            <TableHeader>
                <TableRow className="bg-muted/50 text-muted-foreground hover:bg-muted/50">
                    {role_id === 1 && <TableHead className="w-[20%] border text-center">Informasi Pengguna</TableHead>}
                    <TableHead className="w-[25%] border text-center">Gejala yang Dialami</TableHead>
                    <TableHead className="w-[20%] border text-center">Hasil Diagnosa</TableHead>
                    <TableHead className="w-[30%] border text-center">Solusi Penanganan</TableHead>
                    <TableHead className="w-[5%] border text-center">#</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rekaps.length ? (
                    rekaps.map((rekap, index) =>
                        rekap.rekap_penyakits.map((r_penyakit, idx) => (
                            <TableRow key={`${index}-${idx}`} className="hover:bg-transparent">
                                {idx === 0 && (
                                    <>
                                        {role_id === 1 && (
                                            <TableCell rowSpan={rekap.rekap_penyakits.length} className="border align-top text-xs whitespace-normal">
                                                <div>Nama: {rekap.name}</div>
                                                <div>Email: {rekap.email}</div>
                                                <div>Role: {rekap.role}</div>
                                            </TableCell>
                                        )}
                                        <TableCell rowSpan={rekap.rekap_penyakits.length} className="border align-top text-sm whitespace-normal">
                                            <ul className="list-disc pl-5">
                                                {rekap.rekap_gejalas.map((r_gejala, idx_gejala) => (
                                                    <li key={`${index}-${idx}-${idx_gejala}`}>{r_gejala.gejala.nama_gejala}</li>
                                                ))}
                                            </ul>
                                            <div className="text-muted-foreground mt-3 text-xs">
                                                Direkap pada hari {formatDateTime(rekap.created_at, 'id-ID')}
                                            </div>
                                        </TableCell>
                                    </>
                                )}
                                <TableCell className="border text-sm whitespace-normal">{`${idx + 1}. ${r_penyakit.penyakit.nama_penyakit} (${r_penyakit.persentase}%)`}</TableCell>
                                <TableCell className="border text-sm whitespace-normal">{r_penyakit.penyakit.solusi}</TableCell>
                                {idx === 0 && (
                                    <TableCell rowSpan={rekap.rekap_penyakits.length} className="border text-center">
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
                                    </TableCell>
                                )}
                            </TableRow>
                        )),
                    )
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
