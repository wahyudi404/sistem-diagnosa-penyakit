import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { KeputusanCreateProps } from '@/types/keputusan';
import { Trash2Icon } from 'lucide-react';

interface TableCreateProps {
    data: KeputusanCreateProps[];
    handleDelete: (index: number) => void
}
const TableCreateComponent = ({ data, handleDelete } : TableCreateProps) => {
    return (
        <Table className="mt-6">
            <TableHeader>
                <TableRow>
                    <TableHead className="border text-center">No</TableHead>
                    <TableHead className="border text-center">Kode</TableHead>
                    <TableHead className="border">Nama Gejala</TableHead>
                    <TableHead className="border text-center">#</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length ? (
                    data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="border text-center">{index + 1}</TableCell>
                            <TableCell className="border text-center">{item.kode_gejala}</TableCell>
                            <TableCell className="border">{item.nama_gejala}</TableCell>
                            <TableCell className="border text-center">
                                <Button type="button" onClick={() => handleDelete(index)} variant="destructive" size="sm" className="cursor-pointer">
                                    <Trash2Icon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="border text-center">
                            <p className="text-muted text-sm font-semibold">Data kosong</p>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default TableCreateComponent;
