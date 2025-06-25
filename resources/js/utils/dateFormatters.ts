export const formatDateTime = (dateString: string, locales: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locales, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    // Contoh Hasil: "Rabu, 20 April 2023 14:30"
};
