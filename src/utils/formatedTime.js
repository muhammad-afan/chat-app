export const getMessageTime = (messageDate) => {
    const now = new Date();

    // Check if the message is from today
    if (
        messageDate.getDate() === now.getDate() &&
        messageDate.getMonth() === now.getMonth() &&
        messageDate.getFullYear() === now.getFullYear()
    ) {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }).format(messageDate);
    }

    // Check if the message is from yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear()
    ) {
        return 'Yesterday';
    }

    // If not today or yesterday, show the full date
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
    }).format(messageDate);
};