export type TotalProbabilitas = Array<number>;
export type ProbabilitasAwal = Array<number>;
export type NormalisasiProbabilitas = Array<string>;
export interface DataPengujian {
    gejala_id: number;
    nama_gejala: string;
    prob_kondisional: Array<number | '-'>;
    prob_posterior: Array<number | '-'>;
}
export interface ChartData {
    kode: string;
    penyakit: string;
    persentase: number;
    solusi: string;
}
