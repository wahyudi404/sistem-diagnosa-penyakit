import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type KeputusanProps, type PenyakitProps } from '@/types/keputusan';

const Page = ({ dt_keputusans, penyakits }: { dt_keputusans: KeputusanProps[], penyakits: PenyakitProps[] }) => {
    return (
        <Table className="w-full rounded-2xl">
            <TableHeader>
                <TableRow>
                    <TableHead rowSpan={2} className="w-[5%] border text-center">
                        No
                    </TableHead>
                    <TableHead rowSpan={2} className="w-[15%] border text-center">
                        Kode Gejala
                    </TableHead>
                    <TableHead colSpan={penyakits.length} className="w-[80%] border text-center">
                        Kode Penyakit
                    </TableHead>
                </TableRow>
                <TableRow>
                    {penyakits.map((item, index) => (
                        <TableHead key={index} className="border text-center">{item.kode}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {dt_keputusans.map((item, index) => (
                    <TableRow key={item.kode_gejala}>
                        <TableCell className="border text-center">{++index}</TableCell>
                        <TableCell className="border text-center">{item.kode_gejala}</TableCell>
                        {item.keputusans.map((keputusan, idx) => (
                            <TableCell key={idx} className="border text-center">{keputusan}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default Page;
