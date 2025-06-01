export function formatMessage(template: string, meta: Record<string, any>): string {
    return template.replace(/\{(.+?)\}/g, (_, key) => {
        const value = meta[key];
        return value !== undefined ? String(value) : `{${key}}`;
    });
}
