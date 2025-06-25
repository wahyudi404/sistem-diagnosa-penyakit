'use client';

import { Toast } from '@/components/alerts/toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    nama_gejala: z.string().min(1, { message: 'Nama gejala tidak boleh kosong' }),
});

interface formInputsType {
    label: string;
    name: 'nama_gejala';
    type: string;
    placeholder: string;
}

const formInputs: formInputsType[] = [
    {
        label: 'Nama Gejala',
        name: 'nama_gejala',
        type: 'text',
        placeholder: 'Masukkan nama gejala',
    },
];

const FormAdd = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama_gejala: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route('gejala.store'), values, {
            onSuccess: () => {
                form.reset();
                Toast.fire({
                    icon: 'success',
                    title: 'Data gejala berhasil ditambahkan',
                })
            },
            onError: (err) => {
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title: 'Data gejala gagal ditambahkan',
                });
            },
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
                            <DialogTitle>Tambah Data Gejala</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>Silahkan isi data gejala</DialogDescription>
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
                                                <Input placeholder={input.placeholder} {...field} type={input.type} />
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
