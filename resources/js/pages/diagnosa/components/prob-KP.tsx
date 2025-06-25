import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataPengujian } from '@/types/diagnosa';
import { PenyakitProps } from '@/types/keputusan';

interface ProbKPProps {
    no: string;
    title: string;
    data_pengujian: DataPengujian[];
    penyakits: PenyakitProps[];
    prob: 'kondisional' | 'posterior';
}

const ProbKP = ({ no, title, data_pengujian, penyakits, prob }: ProbKPProps) => {
    return (
        <div>
            <h1 className="mb-2 text-lg font-semibold">{no}</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="border text-center bg-slate-900">{title}</TableHead>
                        {penyakits.map((penyakit, idx) => (
                            <TableHead key={idx} className="border text-center">{penyakit.kode}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data_pengujian.map((item, idx) => (
                        <TableRow key={idx}>
                            <>
                                <TableCell className="border text-center">{`G${item.gejala_id}`}</TableCell>
                                {prob == 'kondisional'
                                    ? item.prob_kondisional.map((prob, prob_idx) => (
                                          <TableCell key={idx + prob_idx} className="border text-center">
                                              {prob}
                                          </TableCell>
                                      ))
                                    : item.prob_posterior.map((prob, prob_idx) => (
                                          <TableCell key={idx + prob_idx} className="border text-center">
                                              {prob}
                                          </TableCell>
                                      ))}
                            </>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProbKP;
