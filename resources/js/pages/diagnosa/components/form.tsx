import { Button } from '@/components/ui/button';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { router } from '@inertiajs/react';
import { Loader2Icon, TestTube2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface DataProps {
    kode_gejala: string;
    nama_gejala: string;
}

const FormDiagnosa = ({ data }: { data: DataProps[] }) => {
    const [selected, setSelected] = useState<Option[]>([
        // {
        //     'value': 'G9',
        //     'label': 'Laptop berjalan sangat lambat.'
        // },
        // {
        //     'value': 'G11',
        //     'label': 'Proses booting sangat lama.'
        // },
        // {
        //     'value': 'G14',
        //     'label': 'Hard disk mengeluarkan suara aneh.'
        // },
    ]);
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (data && data.length > 0) {
            const formattedOptions = data.map((item) => ({
                value: item.kode_gejala,
                label: item.nama_gejala,
            }));
            setOptions(formattedOptions);
        } else {
            setOptions([]);
        }
    }, [data]);

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true)

        if(!selected.length) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Silahkan pilih gejala-gejala terlebih dahulu!',
                timer: 2000,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                theme: 'dark'
            })
            setLoading(false)
            return;
        }

        const formData = {
            data: selected.map((item) => ({
                gejala_id: parseInt(item.value.slice(1)),
                nama_gejala: item.label
            }))
        }

        router.post(route('diagnosa.hasil'), formData, {
            onError: () => {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Terjadi kesalahan saat melakukan diagnosa!',
                    timer: 200,
                    toast: true,
                    position: 'top-end',
                    theme: 'dark',
                    showConfirmButton: false,
                })
            },
            onFinish: () => {
                setLoading(false)
            }
        })
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <MultipleSelector
                value={selected}
                onChange={setSelected}
                options={options}
                placeholder="Masukkan gejala-gejala penyakit..."
                emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
            />
            {selected.length > 0 && (
                <div className="mt-4 rounded border p-3">
                    <h2 className="text-xl font-semibold">Gejala yang terpilih:</h2>
                    <ul className="list-inside list-decimal">
                        {selected.map((item) => (
                            <li
                                key={item.value}
                                dangerouslySetInnerHTML={{
                                    __html: `[${item.value}]: ${item.label}`,
                                }}
                            />
                        ))}
                    </ul>
                </div>
            )}
            <hr className="my-4" />
            <div>
                <Button type="submit" disabled={loading} variant="outline" className="cursor-pointer">
                    {!loading ? <TestTube2Icon/> : <Loader2Icon className='animate-spin' />} Diagnosis
                </Button>
            </div>
        </form>
    );
};

export default FormDiagnosa;
