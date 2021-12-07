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
        },
        remote: {
            type: Boolean,
            default: false
        }
    },
    render(h, context) {
        let svgClass = (context.data.class || []);
        let svgClassName = typeof svgClass === 'string' ? svgClass : svgClass.join(' ');
        return <svg aria-hidden="true" class={(context.data.staticClass || '') + svgClassName + ' y-icon'}
            style={context.data.style || {}} {...{
                on: context.data.on
            }}>
            <use xlinkHref={context.props.remote
                ? context.props.name : `#icon-${context.props.name}`} style="pointer-events:none" />
        </svg>;
    }
};
</script>

<style lang="less">
    .y-icon {
        width: 14px;
        height: 14px;
        fill: @font;
    }
</style>
