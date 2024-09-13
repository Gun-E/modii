export const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const today = new Date();

    const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();

    if (isToday) {
        const timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        const [time, period] = timeString.split(' ');
        return `${period} ${time}`;
    } else {
        const year = date.getFullYear().toString().slice(-2); // YY
        const month = String(date.getMonth() + 1).padStart(2, '0'); // MM
        const day = String(date.getDate()).padStart(2, '0'); // DD
        return `${year}.${month}.${day}`; // "24.09.10"
    }
};
