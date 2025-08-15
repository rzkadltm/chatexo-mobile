export const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const createdDate = new Date(dateString);
    const diffMs = now.getTime() - createdDate.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
    return 'just now';
    } else if (diffMinutes < 10) {
    return 'just now';
    } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
    const remainderMinutes = diffMinutes % 60;
    return `${diffHours} hour${diffHours === 1 ? '' : 's'}${remainderMinutes > 0 ? ` ${remainderMinutes} minute${remainderMinutes === 1 ? '' : 's'}` : ''} ago`;
    } else if (diffDays === 1) {
    return '1 day ago';
    } else {
    return `${diffDays} days ago`;
    }
};