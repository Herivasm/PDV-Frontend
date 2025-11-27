import type {
    MetadataRoute
} from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Punto de Venta',
        short_name: 'PDV',
        description: 'Sistema de punto de venta',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0047FF',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}