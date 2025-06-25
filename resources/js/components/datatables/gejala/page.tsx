import { Gejala, columns } from './columns';
import { DataTable } from './data-table';

export default function GejalaPage({ gejalas }: { gejalas: Gejala[] }) {
    return (
        <div className="w-full px-4">
            <DataTable columns={columns} data={gejalas} />
        </div>
    );
}
