//https://erikflowers.github.io/weather-icons/

// extracts /path and raw <svg>
const iconModules = import.meta.glob('../assets/icons/weather/*.svg', {
    eager: true,
    query: '?raw',
    import: 'default',
});

const icons = {};
for (const path in iconModules) {
    // returns icon name without '.svg'
    const iconName = path.split('/').pop().replace('.svg', '');
    icons[iconName] = iconModules[path];
}

export function getWeatherIcon(iconName) {
    return icons[iconName] || ''; // Return the SVG or an empty string if not found
}