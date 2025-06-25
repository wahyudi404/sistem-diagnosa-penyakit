import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TotalProbabilitas } from '@/types/diagnosa';
import { PenyakitProps } from '@/types/keputusan';

interface TotalProbProps {
    no: string;
    total_probabilitas: TotalProbabilitas;
    penyakits: PenyakitProps[];
}

const TotalProb = ({ no, total_probabilitas, penyakits }: TotalProbProps) => {

  return (
    <div>
      <h1 className='text-lg font-semibold mb-2'>{no} Total Probabilitas untuk Setiap Penyakit</h1>

      <Table>
        <TableHeader>
            <TableRow>
                {penyakits.map((penyakit, idx) => (
                    <TableHead key={idx} className='border text-center'>{penyakit.kode}</TableHead>
                ))}
                <TableHead className='border text-center'>Total</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                {total_probabilitas.map((item, idx) => (
                    <TableCell key={idx} className='border text-center'>{parseFloat(item.toFixed(2))}</TableCell>
                ))}
                <TableCell className='border text-center'>{Math.round(total_probabilitas.reduce((a, b) => a + b, 0))}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default TotalProb
