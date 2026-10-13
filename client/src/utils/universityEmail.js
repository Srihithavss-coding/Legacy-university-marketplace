const DEFAULT_ALLOWED_DOMAINS = ['.edu', '.ac.in', '.edu.in'];

export const getAllowedEmailDomains = () => {
    const raw = import.meta.env.VITE_ALLOWED_EMAIL_DOMAINS;
    if (!raw || !String(raw).trim()) return DEFAULT_ALLOWED_DOMAINS;

    return String(raw)
        .split(',')
        .map((domain) => domain.trim().toLowerCase())
        .filter(Boolean);
};

export const isUniversityEmail = (email, allowedDomains = getAllowedEmailDomains()) => {
    if (!email || typeof email !== 'string' || !email.includes('@')) return false;

    const domain = email.split('@').pop().trim().toLowerCase();
    if (!domain) return false;

    return allowedDomains.some((allowed) => {
        if (allowed.startsWith('.')) {
            return domain.endsWith(allowed);
        }
        return domain === allowed || domain.endsWith(`.${allowed}`);
    });
};

export const universityEmailErrorMessage = (allowedDomains = getAllowedEmailDomains()) => {
    const readable = allowedDomains.join(', ');
    return `Please use an approved university email (${readable}). Personal inboxes like Gmail are not allowed.`;
};
