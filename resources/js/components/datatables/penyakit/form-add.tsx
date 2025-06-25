'use client';

import { Toast } from '@/components/alerts/toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    nama_penyakit: z.string().min(1, { message: 'Nama penyakit tidak boleh kosong' }),
    solusi: z.string().min(1, { message: 'Solusi tidak boleh kosong' }),
});

interface formInputsType {
    label: string;
    name: 'nama_penyakit' | 'solusi';
    type: string;
    placeholder: string;
}

const formInputs: formInputsType[] = [
    {
        label: 'Nama Penyakit',
        name: 'nama_penyakit',
        type: 'text',
        placeholder: 'Masukkan nama penyakit',
    },
    {
        label: 'Solusi',
        name: 'solusi',
        type: 'textarea',
        placeholder: 'Masukkan solusi pengobatan',
    },
];

const FormAdd = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama_penyakit: '',
            solusi: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route('penyakit.store'), values, {
            onSuccess: () => {
                form.reset();
                Toast.fire({
                    icon: 'success',
                    title: 'Data penyakit berhasil ditambahkan',
                });
            },
            onError: (err) => {
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title: 'Data penyakit gagal ditambahkan. ',
                });
            },
            preserveScroll: true,
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <Plus /> Tambah
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Tambah Data Penyakit</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>Silahkan isi data penyakit</DialogDescription>
                        <div className="grid gap-4 py-4">
                            {formInputs.map((input) => (
                                <FormField
                                    key={input.name}
                                    control={form.control}
                                    name={input.name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{input.label}</FormLabel>
                                            <FormControl>
                                                {input.type !== 'textarea' ? (
                                                    <Input placeholder={input.placeholder} {...field} type={input.type} />
                                                ) : (
                                                    <Textarea placeholder="Type your message here." {...field} />
                                                )}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <DialogFooter>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default FormAdd;
