const components = require.context('@/components', true, /index.js$/);
window._YComponents = {};
for (const key of components.keys()) {
    window._YComponents[components(key).default.name] = components(key).default;
}

export default window._YComponents;
