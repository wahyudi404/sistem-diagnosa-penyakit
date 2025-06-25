'use client';

import { Toast } from '@/components/alerts/toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
        title: 'Data Penyakit',
        href: '/penyakit',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

const formSchema = z.object({
    nama_penyakit: z
        .string()
        .min(1, {
            message: 'Penyakit harus lebih dari 1 karakter.',
        })
        .max(255, {
            message: 'Penyakit tidak boleh lebih dari 255 karakter.',
        }),
    solusi: z.string().min(1, {
        message: 'Solusi harus lebih dari 1 karakter.',
    }),
});

interface PenyakitEdit {
    id: number;
    nama_penyakit: string;
    solusi: string;
    created_at?: string;
    updated_at?: string;
}

type LaravelValidationErrors = Record<string, string[]>;

export default function Edit({ penyakit, errors }: { penyakit: PenyakitEdit; errors: LaravelValidationErrors }) {
    const [loading, setLoading] = useState<boolean>(false);
    // define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama_penyakit: penyakit.nama_penyakit,
            solusi: penyakit.solusi,
        },
    });

    // define submit handler
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        router.put(route('penyakit.update', penyakit.id), values, {
            onSuccess: () => {
                Toast.fire({
                    title: 'Berhasil',
                    icon: 'success',
                    text: 'Data berhasil diperbarui.',
                });
                setLoading(false);
            },
            onError: (error) => {
                console.log(error);
                Toast.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Gagal memperbarui data.',
                });
                setLoading(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Penyakit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min lg:w-3/4">
                    <h1 className="mb-8 text-2xl font-bold">Edit Data Penyakit</h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Form Field Kode */}
                            <FormItem>
                                <FormLabel>Kode</FormLabel>
                                <FormControl>
                                    <Input autoComplete="off" value={`P${penyakit.id}`} disabled readOnly />
                                </FormControl>
                            </FormItem>

                            {/* Form Field Penyakit */}
                            <FormField
                                control={form.control}
                                name="nama_penyakit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Penyakit</FormLabel>
                                        <FormControl>
                                            <Input autoComplete="off" placeholder="Tuliskan penyakit disini..." {...field} />
                                        </FormControl>
                                        {errors.nama_penyakit && <FormDescription className="text-red-600">{errors.nama_penyakit[0]}</FormDescription>}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Form Field Solusi */}
                            <FormField
                                control={form.control}
                                name="solusi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Solusi</FormLabel>
                                        <FormControl>
                                            <Textarea autoComplete="off" placeholder="Tuliskan solusi disini..." {...field} />
                                        </FormControl>
                                        {errors.solusi && <FormDescription className="text-red-600">{errors.solusi[0]}</FormDescription>}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                className={loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                                disabled={loading}
                                onClick={() => !loading && router.get(route('penyakit.index'))}
                            >
                                <ArrowLeftIcon/> Kembali
                            </Button>
                            <Button type="submit" variant="outline" disabled={loading} className="ml-2 cursor-pointer">
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    <>
                                        <SaveIcon/> Simpan
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
