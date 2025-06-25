'use client';

import { Toast } from '@/components/alerts/toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { ArrowLeftIcon, Loader2, SaveIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Pengguna',
        href: '/users',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Nama harus lebih dari 1 karakter.',
    }),
    email: z.string().min(1, {
        message: 'Email harus lebih dari 1 karakter.',
    }),
    password: z.string().min(8, {
        message: 'Password harus lebih dari 8 karakter.',
    }).nullable(),
    password_confirmation: z.string().min(8, {
        message: 'Password harus lebih dari 8 karakter.',
    }).nullable(),
    role_id: z.string().min(1, {
        message: 'Role harus lebih dari 1 karakter.',
    }),
});

interface UserEdit {
    id: number;
    name: string;
    email: string;
    role_id: string;
    created_at?: string;
    updated_at?: string;
}

type LaravelValidationErrors = Record<string, string[]>;

export default function Edit({ user, errors }: { user: UserEdit; errors: LaravelValidationErrors }) {
    const [loading, setLoading] = useState<boolean>(false);
    // define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            role_id: String(user.role_id),
            password: '',
            password_confirmation: ''
        },
    });

    // define submit handler
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        router.put(route('users.update', user.id), values, {
            onSuccess: () => {
                Toast.fire({
                    title: 'Berhasil',
                    icon: 'success',
                    text: 'Data berhasil diperbarui.',
                });
            },
            onError: () => {
                Toast.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Gagal memperbarui data.',
                });
            },
            onFinish: () => {
                setLoading(false);
                // reset
                form.reset();
            },
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Pengguna" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min lg:w-3/4">
                    <h1 className="mb-8 text-2xl font-bold">Edit Data Pengguna</h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Form Field Nama */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama</FormLabel>
                                        <FormControl>
                                            <Input autoComplete="off" placeholder="Masukkan nama" {...field} />
                                        </FormControl>
                                        {errors.name && <FormDescription className="text-red-600">{errors.name}</FormDescription>}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Form Field Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input autoComplete="off" placeholder="Masukkan email" {...field} />
                                        </FormControl>
                                        {errors.email && <FormDescription className="text-red-600">{errors.email}</FormDescription>}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Form Field Role */}
                            <FormField
                                control={form.control}
                                name="role_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Admin</SelectItem>
                                                    <SelectItem value="2">Pengguna</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        {errors.role_id && <FormDescription className="text-red-600">{errors.role_id}</FormDescription>}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Form Field Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' autoComplete="off" placeholder="Masukkan password" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        {errors.password && <FormDescription className="text-red-600">{errors.password}</FormDescription>}
                                        <FormDescription>
                                            Masukkan password jika ingin merubah password.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Form Field Password Confirmation */}
                            <FormField
                                control={form.control}
                                name="password_confirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Konfirmasi Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' autoComplete="off" placeholder="Masukkan konfirmasi password" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                className={loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                                disabled={loading}
                                onClick={() => !loading && router.get(route('users.index'))}
                            >
                                <ArrowLeftIcon /> Kembali
                            </Button>
                            <Button type="submit" variant="outline" disabled={loading} className="ml-2 cursor-pointer">
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    <>
                                        <SaveIcon /> Simpan
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
