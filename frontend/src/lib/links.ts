// Tautan unduhan APK (Google Drive). Diisi lewat env agar bisa diganti tanpa ubah kode.
// Contoh: VITE_APK_URL=https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing
export const APK_URL: string = import.meta.env.VITE_APK_URL ?? "";
export const APK_VERSION: string = import.meta.env.VITE_APK_VERSION ?? "1.0.0";
