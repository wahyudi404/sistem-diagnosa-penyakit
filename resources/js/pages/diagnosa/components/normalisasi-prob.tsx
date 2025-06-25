import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { NormalisasiProbabilitas } from '@/types/diagnosa';
import { PenyakitProps } from '@/types/keputusan';
import React from 'react'

interface NormalisasiProbProps {
    no: string;
    normalisasi_prob: NormalisasiProbabilitas;
    penyakits: PenyakitProps[];
}

const NormalisasiProb = ({ no, normalisasi_prob, penyakits }: NormalisasiProbProps) => {
  return (
    <div>
      <h1 className='text-lg font-semibold mb-2'>{no} Normalisasi Probabilitas</h1>

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
                {normalisasi_prob.map((item, idx) => (
                    <TableCell key={idx} className='border text-center'>{item}</TableCell>
                ))}
            </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default NormalisasiProb
