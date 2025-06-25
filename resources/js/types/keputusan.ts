export interface KeputusanProps {
    kode_gejala: string;
    keputusans: Array<"-" | 1>;
}

export interface PenyakitProps {
    id: number;
    kode: string;
    nama_penyakit?: string;
}

export interface PenyakitCreateProps {
    id: number;
    kode: string;
    nama_penyakit: string;
}

export interface KeputusanCreateProps {
    id: number | null;
    gejala_id: number | null;
    penyakit_id: number;
    kode_penyakit: string | null;
    kode_gejala: string | null;
    nama_gejala: string | null;
}

export interface GejalaCreateProps {
    id: number;
    kode_gejala: string;
    nama_gejala: string;
}
