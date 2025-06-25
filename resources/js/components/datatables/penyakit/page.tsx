import { Penyakit, columns } from './columns';
import { DataTable } from './data-table';

export default function PenyakitPage({ penyakits }: { penyakits: Penyakit[] }) {
    return (
        <div className="w-full px-4">
            <DataTable columns={columns} data={penyakits} />
        </div>
    );
}
