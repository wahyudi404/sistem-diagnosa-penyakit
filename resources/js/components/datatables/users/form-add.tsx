'use client';

import { Toast } from '@/components/alerts/toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
    email: z.string().min(1, { message: 'Email tidak boleh kosong' }),
    password: z.string().min(8, { message: 'Password tidak boleh kosong' }),
    password_confirmation: z.string().min(8, { message: 'Password tidak boleh kosong' }),
    role_id: z.string().min(1, { message: 'Role tidak boleh kosong' }),
});

interface formInputsType {
    label: string;
    name: 'name' | 'email' | 'password' | 'password_confirmation' | 'role_id';
    type: string;
    placeholder: string;
}

const formInputs: formInputsType[] = [
    {
        label: 'Nama',
        name: 'name',
        type: 'text',
        placeholder: 'Masukkan nama',
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Masukkan email',
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: 'Masukkan password',
    },
    {
        label: 'Konfirmasi Password',
        name: 'password_confirmation',
        type: 'password',
        placeholder: 'Masukkan konfirmasi password',
    },
    {
        label: 'Role',
        name: 'role_id',
        type: 'select',
        placeholder: 'Pilih role',
    },
];

const FormAdd = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role_id: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        router.post(route('users.store'), values, {
            onSuccess: () => {
                form.reset();
                Toast.fire({
                    icon: 'success',
                    title: 'Data pengguna berhasil ditambahkan',
                });
                // close modal
                router.visit(route('users.index'));
            },
            onError: (err) => {
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title: 'Data pengguna gagal ditambahkan. ',
                    text: err.name || err.email || err.password || err.role_id
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
                            <DialogTitle>Tambah Data Pengguna</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>Silahkan isi data pengguna</DialogDescription>
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
                                                {input.type !== 'select' ? (
                                                    <Input placeholder={input.placeholder} {...field} type={input.type} />
                                                ) : (
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih Role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">Admin</SelectItem>
                                                            <SelectItem value="2">Pengguna</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </FormControl>
                                            {}
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
