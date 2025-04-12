export type HttpHeaderType = {
    'Content-Type':
        | 'application/json'
        | 'application/x-www-form-urlencode'
        | 'multipart/formed-data'
        | 'application/pdf'
        | 'audio/mpeg'
        | 'image/jpeg'
        | 'text/csv'
        | 'text/plain'
        | 'text/xml';
    Accept: 'application/json' | 'text/html' | 'application/xml';
    Authorization?: string;
    Version?: string;
};
