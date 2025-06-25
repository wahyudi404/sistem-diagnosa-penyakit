import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { GejalaCreateProps, KeputusanCreateProps, PenyakitCreateProps } from '@/types/keputusan';
import { Head, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import FormCreateComponent from './components/form';
import TableCreateComponent from './components/table';
import HeaderCreateComponent from './components/header';
import { CheckedState } from '@radix-ui/react-checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Training',
        href: '/data-training',
    },
    {
        title: 'Buat',
        href: '/data-training/create',
    },
];

interface CreateProps {
    penyakits: PenyakitCreateProps[];
    keputusans: KeputusanCreateProps[];
    gejalas: GejalaCreateProps[];
}

const Create = ({ penyakits, keputusans, gejalas }: CreateProps) => {
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [original, setOriginal] = React.useState<KeputusanCreateProps[]>([]);
    const [data, setData] = React.useState<KeputusanCreateProps[]>([]);
    const [dataGejala, setDataGejala] = React.useState<GejalaCreateProps[]>([]);
    const [kodePenyakit, setKodePenyakit] = React.useState<string>('');
    const [kodeGejala, setKodeGejala] = React.useState('');
    const [isNew, setIsNew] = React.useState<CheckedState>(false);
    const [solusi, setSolusi] = React.useState<string>("");

    const onChangeComboBox = (value: string) => {
        if (value) {
            setKodePenyakit(value);
            const filteredKeputusans = keputusans.filter((keputusan) => keputusan.kode_penyakit === value);
            const filteredGejalas = gejalas.filter((gejala) => filteredKeputusans.every((keputusan) => keputusan.kode_gejala !== gejala.kode_gejala));
            setDataGejala(filteredGejalas);
            setData(filteredKeputusans);
            setOriginal(filteredKeputusans);
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const handleAdd = () => {
        if (kodeGejala === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pilih gejala terlebih dahulu!',
                timer: 2000,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                theme: 'dark',
            });
            return;
        }

        let rs;
        if(isNew) {
            const penyakit_id: number = parseInt(kodePenyakit.slice(1));
            rs = {
                id: null,
                gejala_id: null,
                penyakit_id: penyakit_id,
                kode_penyakit: kodePenyakit,
                kode_gejala: null,
                nama_gejala: kodeGejala
            }
        }else {
            const gejala_id: number = parseInt(kodeGejala.slice(1));
            const penyakit_id: number = parseInt(kodePenyakit.slice(1));
            const nama_gejala: string = gejalas.find((item) => item.kode_gejala === kodeGejala)?.nama_gejala || '';
            rs = {
                id: null,
                gejala_id: gejala_id,
                penyakit_id: penyakit_id,
                kode_penyakit: kodePenyakit,
                kode_gejala: kodeGejala,
                nama_gejala: nama_gejala,
            };
        }

        // tambahkan ke data
        setDataGejala((prev) => prev.filter((item) => item.kode_gejala !== kodeGejala));
        setData((prev) => [...prev, rs]);
        setKodeGejala('');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // validasi data
        if (kodePenyakit === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pilih penyakit terlebih dahulu!',
                timer: 2000,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                theme: 'dark',
            });
            setLoading(false);
            return;
        }

        // validasi jika data sama dengan original atau tidak ada perubahan
        if (JSON.stringify(data) === JSON.stringify(original)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tidak ada perubahan data!',
                timer: 2000,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                theme: 'dark',
            });
            setLoading(false);
            return;
        }

        let penyakit_id: number | string = parseInt(kodePenyakit.slice(1));
        if(isNaN(penyakit_id)) {
            penyakit_id = kodePenyakit;
        }

        const formData = {
            penyakit_id,
            solusi: solusi,
            data: data.map((item) => ({
                id: item.id,
                gejala_id: item.gejala_id,
                nama_gejala: item.nama_gejala,
            })),
        };

        router.post(route('data-training.store'), formData, {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data berhasil disimpan',
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true,
                    theme: 'dark',
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan saat menyimpan data',
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true,
                    theme: 'dark',
                });
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    const handleDelete = (index: number) => {
        setData((prev) => prev.filter((item, i) => i !== index));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Data Training" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-2">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="p-4">
                        <HeaderCreateComponent penyakits={penyakits} onChangeComboBox={onChangeComboBox} setSolusi={setSolusi} />
                        {open && (
                            <div className="relative overflow-hidden rounded-lg p-2">
                                <h2 className="text-sm font-medium">
                                    Data Gejala Penyakit <b>"{kodePenyakit}"</b>
                                </h2>
                                <hr className="my-3" />
                                <FormCreateComponent
                                    handleSubmit={handleSubmit}
                                    dataGejala={dataGejala}
                                    kodeGejala={kodeGejala}
                                    setKodeGejala={setKodeGejala}
                                    loading={loading}
                                    handleAdd={handleAdd}
                                    isNew={isNew}
                                    setIsNew={setIsNew}
                                />
                                <TableCreateComponent data={data} handleDelete={handleDelete} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
