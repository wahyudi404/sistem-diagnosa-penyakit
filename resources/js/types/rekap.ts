export interface RekapGejalas {
    id: number;
    rekap_id: number;
    gejala_id: number;
    gejala: {
        id: number;
        nama_gejala: string;
        created_at: string;
        updated_at: string;
    };
}

export interface RekapPenyakits {
    id: number;
    rekap_id: number;
    penyakit_id: number;
    persentase: number;
    penyakit: {
        id: number;
        nama_penyakit: string;
        solusi: string;
        created_at: string;
        updated_at: string;
    };
}

export interface RekapsProps {
    id: number;
    user_id: number;
    name: string;
    email: string;
    role: string;
    rekap_gejalas: RekapGejalas[];
    rekap_penyakits: RekapPenyakits[];
    created_at: string;
    updated_at: string;
}
