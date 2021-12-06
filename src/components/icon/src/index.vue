<script>
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/icons', true, /\.svg$/);
requireAll(req);

export default {
    name: 'YIcon',
    functional: true,
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    render(h, context) {
        return <svg aria-hidden="true" class={(context.data.staticClass || '') + ' y-icon'}
            style={context.data.style || {}} {...{
                on: context.data.on
            }}>
            <use xlinkHref={`#icon-${context.props.name}`} style="pointer-events:none" />
        </svg>;
    }
};
</script>

<style lang="less">
    .y-icon {
        width: 14px;
        height: 14px;
    }
</style>
