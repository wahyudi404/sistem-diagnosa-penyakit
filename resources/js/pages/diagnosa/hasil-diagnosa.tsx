import { PieChartComponent } from '@/components/pie-chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ChartData, DataPengujian, NormalisasiProbabilitas, ProbabilitasAwal, TotalProbabilitas } from '@/types/diagnosa';
import { PenyakitProps } from '@/types/keputusan';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeftIcon, LineChart, Loader2Icon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import NormalisasiProb from './components/normalisasi-prob';
import ProbAwal from './components/prob-awal';
import ProbKP from './components/prob-KP';
import TotalProb from './components/total_probabilitas';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Diagnosa',
        href: '/diagnosa?back=1',
    },
    {
        title: 'Hasil',
        href: '#',
    },
];

interface HasilProps {
    total_probabilitas: TotalProbabilitas;
    probabilitas_awal: ProbabilitasAwal;
    normalisasi_probabilitas: NormalisasiProbabilitas;
    data_pengujian: DataPengujian[];
    penyakits: PenyakitProps[];
    chart_data: ChartData[];
}

type formDataRekap = {
    rekap_gejalas: number[];
    rekap_penyakits: {
        penyakit_id: number;
        persentase: number;
    }[];
};

export default function HasilDiagnosa({ hasil }: { hasil: HasilProps }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [solusi, setSolusi] = useState<string>('');
    const [penyakit, setPenyakit] = useState<string>('');
    const [kodePenyakit, setKodePenyakit] = useState<string>('');
    const [persentase, setPersentase] = useState<number>(0);

    const setAllState = useCallback(
        (index: number): void => {
            setActiveIndex(index);
            setKodePenyakit(hasil.chart_data[index].kode);
            setPenyakit(hasil.chart_data[index].penyakit);
            setPersentase(hasil.chart_data[index].persentase);
            setSolusi(hasil.chart_data[index].solusi);
        },
        [hasil.chart_data, setActiveIndex, setKodePenyakit, setPenyakit, setPersentase, setSolusi],
    );

    useEffect(() => {
        const result: number = hasil.chart_data.reduce(
            (maxIndex, item, currentIndex, arr) => (item.persentase > arr[maxIndex].persentase ? currentIndex : maxIndex),
            0,
        );
        setAllState(result);
    }, [hasil.chart_data, setAllState]);

    const handleChange = (index: number): void => {
        setAllState(index);
    };

    const handleRekap = (): void => {
        setLoading(true);
        const formData: formDataRekap = {
            rekap_gejalas: hasil.data_pengujian.map((item) => item.gejala_id),
            rekap_penyakits: hasil.chart_data.map((item) => ({
                penyakit_id: parseInt(item.kode.slice(1)),
                persentase: item.persentase,
            })),
        };

        router.post(route('rekap.store'), formData, {
            onSuccess: (): void => {
                Swal.fire({
                    title: 'Berhasil',
                    text: 'Berhasil menyimpan rekap hasil diagnosa.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                    position: 'top-end',
                    theme: 'dark',
                });
            },
            onError: (error): void => {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                    position: 'top-end',
                    theme: 'dark',
                });
            },
            onFinish: (): void => {
                setLoading(false);
            },
        });

        // console.log(formData, hasil);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hasil Diagnosa" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                    {/* Header */}
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-medium">Hasil Diagnosa</h1>
                            <div className="flex gap-4">
                                <Button onClick={handleRekap} disabled={loading} className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
                                    {!loading ? <LineChart className="h-4 w-4" /> : <Loader2Icon className="h-4 w-4 animate-spin" />}
                                    Rekap Hasil
                                </Button>
                                <div className="border"></div>
                                <Button variant="destructive" disabled={loading} className="cursor-pointer" asChild>
                                    <Link href="/diagnosa?back=1">
                                        <ArrowLeftIcon /> Kembali
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <hr className="my-3" />
                    </div>

                    <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-xl">
                            <PieChartComponent
                                title="Pie Chart Penyakit"
                                chart_data={hasil.chart_data}
                                activeIndex={activeIndex}
                                handleChange={handleChange}
                            >
                                <CardFooter className="flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-2 leading-none font-medium">Gejala yang Dialami:</div>
                                    <div className="text-muted-foreground leading-none">
                                        {hasil.data_pengujian.map((gejala, index) => (
                                            <span key={index}>
                                                G{gejala.gejala_id}{index !== hasil.data_pengujian.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </div>
                                </CardFooter>
                            </PieChartComponent>
                        </div>
                        <div className="rounded-xl border p-6">
                            {/* <h2 className="mb-2 text-[16px] font-medium">Gejala yang dialami</h2>
                            <ul className="text-muted-foreground list-decimal pl-6 text-sm font-normal">
                                {hasil.data_pengujian.map((gejala, index) => (
                                    <li key={index} className="text-muted-foreground mb-2">
                                        <span>
                                            G{gejala.gejala_id} : {gejala.nama_gejala}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <hr className="my-6" /> */}

                            <h2 className="mb-2 text-[16px] font-medium">
                                {penyakit} - [{kodePenyakit}]
                            </h2>
                            <p className="text-muted-foreground pl-2 text-sm font-normal">
                                Hasil pemeriksaan menunjukkan <b>{persentase}%</b> kemungkinan terdiagnosis <b>{penyakit}</b>. Solusi penanganan yang
                                direkomendasikan adalah:
                                <br /> {solusi}.
                            </p>
                        </div>
                        <div className="rounded-xl border px-6 md:col-span-2">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="cursor-pointer">Lihat Perhitungan Diagnosa</AccordionTrigger>
                                    <AccordionContent>
                                        {/* Probabilitas Awal */}
                                        <div className="mb-6">
                                            <ProbAwal no="1." probabilitas_awal={hasil.probabilitas_awal} penyakits={hasil.penyakits} />
                                        </div>

                                        {/* Probabilitas Kondisional */}
                                        <div className="mb-6">
                                            <ProbKP
                                                title="Prob. K"
                                                no="2. Probabilitas Kondisional"
                                                data_pengujian={hasil.data_pengujian}
                                                penyakits={hasil.penyakits}
                                                prob="kondisional"
                                            />
                                        </div>

                                        {/* Probabilitas Posterior */}
                                        <div className="mb-6">
                                            <ProbKP
                                                title="Prob. P"
                                                no="3. Probabilitas Posterior"
                                                data_pengujian={hasil.data_pengujian}
                                                penyakits={hasil.penyakits}
                                                prob="posterior"
                                            />
                                        </div>

                                        {/* Total Probabilitas */}
                                        <div className="mb-6">
                                            <TotalProb no="4." total_probabilitas={hasil.total_probabilitas} penyakits={hasil.penyakits} />
                                        </div>

                                        {/* Total Probabilitas */}
                                        <div className="mb-6">
                                            <NormalisasiProb no="5." normalisasi_prob={hasil.normalisasi_probabilitas} penyakits={hasil.penyakits} />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
