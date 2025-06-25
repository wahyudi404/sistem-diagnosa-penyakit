import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PenyakitCreateProps } from '@/types/keputusan';
import { Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { CreateComboBoxComponent } from './combobox';
import { CheckedState } from '@radix-ui/react-checkbox';

interface HeaderProps {
    penyakits: PenyakitCreateProps[];
    onChangeComboBox: (value: string) => void;
    setSolusi: (value: string) => void;
}

const HeaderCreateComponent = ({ penyakits, onChangeComboBox, setSolusi }: HeaderProps) => {
    const [isNew, setIsNew] = useState<CheckedState>(false);

    return (
        <div className="relative mb-4 overflow-hidden rounded-lg p-2">
            <div className="flex items-center justify-between">
                <h1 className="text-sm font-medium">Buat Data Training</h1>
                <Button variant="ghost" className="cursor-pointer" asChild>
                    <Link href={route('data-training.index')}>
                        <ArrowLeftIcon />
                        Kembali
                    </Link>
                </Button>
            </div>
            <hr className="my-3" />
            {isNew ? (
                <>
                <Input type="text" className='mb-2' placeholder="Tulis nama penyakit" onChange={(e) => onChangeComboBox(e.target.value)} />
                <Input type="text" placeholder="Tulis solusi penyakit" onChange={(e) => setSolusi(e.target.value)} />
                </>
            ) : (
                <CreateComboBoxComponent penyakits={penyakits} onChangeComboBox={onChangeComboBox} />
            )}
            <div className="mt-4 flex items-center space-x-2">
                <Checkbox id="penyakit-checkbox" onCheckedChange={setIsNew} />
                <label htmlFor="penyakit-checkbox" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Buat baru
                </label>
            </div>
        </div>
    );
};

export default HeaderCreateComponent;
