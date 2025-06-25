import { User, columns } from './columns';
import { DataTable } from './data-table';

export default function UserPage({ users }: { users: User[] }) {
    return (
        <div className="w-full px-4">
            <DataTable columns={columns} data={users} />
        </div>
    );
}
