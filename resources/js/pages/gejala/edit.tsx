'use client';

import { Toast } from '@/components/alerts/toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
        title: 'Data Gejala',
        href: '/gejala',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

const formSchema = z.object({
    nama_gejala: z
        .string()
        .min(1, {
            message: 'Gejala harus lebih dari 1 karakter.',
        })
        .max(255, {
            message: 'Gejala tidak boleh lebih dari 255 karakter.',
        }),
});

interface GejalaEdit {
    id: number;
    nama_gejala: string;
    created_at?: string;
    updated_at?: string;
}

type LaravelValidationErrors = Record<string, string[]>;

export default function Edit({ gejala, errors }: { gejala: GejalaEdit; errors: LaravelValidationErrors }) {
    const [loading, setLoading] = useState<boolean>(false);
    // define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama_gejala: gejala.nama_gejala,
        },
    });

    // define submit handler
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        router.put(route('gejala.update', gejala.id), values, {
            onSuccess: () => {
                Toast.fire({
                    title: 'Berhasil',
                    icon: 'success',
                    text: 'Data berhasil diperbarui.',
                });
            },
            onError: (error) => {
                console.log(error);
                Toast.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Gagal memperbarui data.',
                });
            },
            onFinish: () => {
                setLoading(false);
            },
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Gejala" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min lg:w-3/4">
                    <h1 className="mb-8 text-2xl font-bold">Edit Data Gejala</h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Form Field Kode */}
                            <FormItem>
                                <FormLabel>Kode</FormLabel>
                                <FormControl>
                                    <Input autoComplete="off" value={`G${gejala.id}`} disabled readOnly />
                                </FormControl>
                            </FormItem>

                            {/* Form Field Gejala */}
                            <FormField
                                control={form.control}
                                name="nama_gejala"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gejala</FormLabel>
                                        <FormControl>
                                            <Input autoComplete="off" placeholder="Tuliskan gejala disini..." {...field} />
                                        </FormControl>
                                        {errors.nama_gejala && <FormDescription className="text-red-600">{errors.nama_gejala[0]}</FormDescription>}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                className={loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                                disabled={loading}
                                onClick={() => !loading && router.get(route('gejala.index'))}
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
