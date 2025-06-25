import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProbabilitasAwal } from '@/types/diagnosa';
import { PenyakitProps } from '@/types/keputusan';
import React from 'react'

interface ProbAwalProps {
    no: string;
    probabilitas_awal: ProbabilitasAwal;
    penyakits: PenyakitProps[];
}

const ProbAwal = ({ no, probabilitas_awal, penyakits }: ProbAwalProps) => {
  return (
    <div>
      <h1 className='text-lg font-semibold mb-2'>{no} Probabilitas Awal</h1>

      <Table>
        <TableHeader>
            <TableRow>
                <TableHead className='border text-center'></TableHead>
                {penyakits.map((penyakit, idx) => (
                    <TableHead key={idx} className='border text-center'>{penyakit.kode}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell className='border text-center'>Probabilitas Awal</TableCell>
                {probabilitas_awal.map((item, idx) => (
                    <TableCell key={idx} className='border text-center'>{item}</TableCell>
                ))}
            </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ProbAwal
