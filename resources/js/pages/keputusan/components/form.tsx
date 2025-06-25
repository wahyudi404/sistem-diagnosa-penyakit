import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { GejalaCreateProps } from '@/types/keputusan';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Loader2Icon, PlusIcon, SaveIcon } from 'lucide-react';
import { CreateComboBoxGejalaComponent } from './combobox-gejala';

interface FormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    dataGejala: GejalaCreateProps[];
    kodeGejala: string;
    setKodeGejala: (value: string) => void;
    loading: boolean;
    handleAdd: () => void;
    isNew: CheckedState;
    setIsNew: (value: CheckedState) => void;
}

const FormCreateComponent = ({ handleSubmit, dataGejala, kodeGejala, setKodeGejala, loading, handleAdd, isNew, setIsNew }: FormProps) => {

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-row">
            <div className="min-w-0 flex-1">
                {isNew ? (
                    <Input type="text" placeholder="Tulis nama gejala" value={kodeGejala} onChange={(e) => setKodeGejala(e.target.value)} />
                ) : (
                    <CreateComboBoxGejalaComponent data={dataGejala} value={kodeGejala} setValue={setKodeGejala} />
                )}
                <div className="mt-4 flex items-center space-x-2">
                    <Checkbox id="gejala-checkbox" onCheckedChange={setIsNew} />
                    <label
                        htmlFor="gejala-checkbox"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Buat baru
                    </label>
                </div>
            </div>
            <div className="flex gap-2 lg:w-auto">
                <Button type="button" disabled={loading} onClick={handleAdd} variant="outline" className="flex-1 cursor-pointer lg:w-[200px]">
                    <PlusIcon /> Tambah Gejala
                </Button>
                <Button
                    type="submit"
                    variant="default"
                    disabled={loading}
                    className="flex-1 cursor-pointer bg-blue-500 font-semibold text-white hover:bg-blue-500/70 lg:w-[200px]"
                >
                    {loading ? <Loader2Icon className="animate-spin" /> : <SaveIcon />}
                    Simpan
                </Button>
            </div>
        </form>
    );
};

export default FormCreateComponent;
