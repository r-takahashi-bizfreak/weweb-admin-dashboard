<template>
    <div class="chart-container" style="position: relative">
        <canvas ref="chartjsLine"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { getRelativePosition } from 'chart.js/helpers';

Chart.register(...registerables);

export default {
    props: {
        content: { type: Object, required: true },
    },
    setup() {
        return { chartInstance: null };
    },
    computed: {
        options() {
            const guidedOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: this.content.isLegend,
                        position: this.content.legendPosition,
                        align: this.content.legendAlignement,
                        labels: {
                            usePointStyle: true,
                            color: wwLib.getStyleFromToken(this.content.legendColor) || this.content.legendColor,
                            font: { size: parseInt(this.content.legendSize) },
                        },
                    },
                },
                elements: {
                    line: {
                        cubicInterpolationMode: this.content.cubicInterpolationMode,
                    },
                },
                scales: {
                    x: {
                        grid: { color: wwLib.getStyleFromToken(this.content.gridColor) || this.content.gridColor, borderColor: wwLib.getStyleFromToken(this.content.gridColor) || this.content.gridColor },
                        ticks: {
                            color: wwLib.getStyleFromToken(this.content.labelColor) || this.content.labelColor,
                            font: { size: parseInt(this.content.legendSize) },
                        },
                    },
                    y: {
                        grid: { color: wwLib.getStyleFromToken(this.content.gridColor) || this.content.gridColor, borderColor: wwLib.getStyleFromToken(this.content.gridColor) || this.content.gridColor },
                        ticks: {
                            color: wwLib.getStyleFromToken(this.content.labelColor) || this.content.labelColor,
                            font: { size: parseInt(this.content.legendSize) },
                        },
                        beginAtZero: this.content.startAtZero,
                    },
                },
            };

            const advancedOptions = typeof this.content.options === 'object' ? this.content.options : guidedOptions;
            return this.content.dataType === 'advanced' ? advancedOptions : guidedOptions;
        },
        config() {
            let labels = [];
            let datasets = [];

            if (this.content.dataType === 'guided') {
                let data =
                    (!this.content.data || Array.isArray(this.content.data)
                        ? this.content.data
                        : this.content.data.data) || [];

                const yAxis = this.content.yAxis;
                let dataXField = this.content.dataXField;
                let dataXFieldProperty = this.content.dataXFieldProperty;
                let dataYField = yAxis === 'item-count' ? this.content.dataXField : this.content.dataYField;
                let dataYFieldProperty = this.content.dataYFieldProperty;
                let groupBy = this.content.groupBy;
                let groupByProperty = this.content.groupByProperty;
                let aggregate = yAxis === 'item-count' ? 'item-count' : this.content.aggregate;
                const colors = this.content.colors.map(color => wwLib.getStyleFromToken(color) || color);

                if (typeof data[0] !== 'object') {
                    data = data.map(value => ({ value }));
                    dataXField = 'value';
                    dataYFieldProperty = undefined;
                    dataYField = 'value';
                    dataXFieldProperty = undefined;
                    groupBy = undefined;
                    groupByProperty = undefined;
                    aggregate = 'item-count';
                }

                if (!groupBy) {
                    datasets = [
                        {
                            label: `${dataYField}`.split("['").pop().replace("']", ''),
                            backgroundColor: colors[0],
                            borderColor: colors[0],
                            data: [],
                        },
                    ];
                    if (!data.length || !Array.isArray(_.get(data[0], dataXField))) {
                        datasets[0].data = data.map(item => ({
                            x: _.get(item, dataXField),
                            y: this.aggregate(
                                aggregate,
                                data
                                    .filter(elem => _.get(elem, dataXField) === _.get(item, dataXField))
                                    .map(elem => _.get(elem, dataYField))
                            ),
                        }));
                    } else {
                        const arrayValues = [
                            ...new Set(
                                data
                                    .map(item => {
                                        const result = _.get(item, dataXField, []);
                                        return Array.isArray(result)
                                            ? result.map(elem => _.get(elem, dataXFieldProperty, elem))
                                            : result;
                                    })
                                    .flat()
                            ),
                        ];
                        datasets[0].data = arrayValues.map(arrayValue => ({
                            x: arrayValue,
                            y: this.aggregate(
                                aggregate,
                                data
                                    .filter(item => {
                                        let result = _.get(item, dataXField, []);
                                        result = Array.isArray(result)
                                            ? result.map(elem => _.get(elem, dataXFieldProperty, elem))
                                            : result;
                                        return result.includes(arrayValue);
                                    })
                                    .map(item => {
                                        const result = _.get(item, dataYField, []);
                                        return Array.isArray(result)
                                            ? result.map(elem => _.get(elem, dataYFieldProperty, elem))
                                            : result;
                                    })
                            ),
                        }));
                    }
                } else {
                    const groupByValues = [
                        ...new Set(
                            data
                                .map(item => {
                                    const result = _.get(item, groupBy, []);
                                    return Array.isArray(result)
                                        ? result.map(elem => _.get(elem, groupByProperty, elem))
                                        : result;
                                })
                                .flat()
                        ),
                    ];
                    const t = [
                        ...new Set(
                            data
                                .map(item => {
                                    const result = _.get(item, dataXField, []);
                                    return Array.isArray(result)
                                        ? result.map(elem => _.get(elem, dataXFieldProperty, elem))
                                        : result;
                                })
                                .flat()
                        ),
                    ];
                    datasets = groupByValues.map((groupByValue, index) => ({
                        label: `${groupByValue}`.split("['").pop().replace("']", ''),
                        backgroundColor: colors[index % colors.length],
                        borderColor: colors[index % colors.length],
                        data: t.map(elem => ({
                            x: elem,
                            y: this.aggregate(
                                aggregate,
                                data
                                    .filter(item => {
                                        const currentDataXFieldValue = _.get(item, dataXField);
                                        const currentGroupByValue = _.get(item, groupBy);
                                        return (
                                            (Array.isArray(currentDataXFieldValue)
                                                ? currentDataXFieldValue
                                                      .map(elem => _.get(elem, dataXFieldProperty, elem))
                                                      .includes(elem)
                                                : currentDataXFieldValue === elem) &&
                                            (Array.isArray(currentGroupByValue)
                                                ? currentGroupByValue
                                                      .map(elem => _.get(elem, groupByProperty, elem))
                                                      .includes(groupByValue)
                                                : currentGroupByValue === groupByValue)
                                        );
                                    })
                                    .map(item => {
                                        const result = _.get(item, dataYField);
                                        return Array.isArray(result)
                                            ? result.map(elem => _.get(elem, dataYFieldProperty, elem))
                                            : result;
                                    })
                            ),
                        })),
                    }));
                }

                // Remove duplicate X values
                for (const dataset of datasets) {
                    dataset.data = dataset.data.filter(
                        (item, index) => dataset.data.findIndex(elem => item.x === elem.x) === index
                    );
                }
                // Empty values
                if (this.content.dataXEmpty === false) {
                    for (const dataset of datasets) {
                        dataset.data = dataset.data.filter(item => item.y && item.x);
                    }
                }
                // Order by
                if (this.content.dataOrderBy !== 'default') {
                    for (const item of datasets) {
                        item.data.sort((a, b) => {
                            const field = this.content.dataOrderBy;
                            return (
                                (typeof a[field] === 'string'
                                    ? a[field].localeCompare(b[field])
                                    : a[field] - b[field]) * (this.content.dataDirection === 'DESC' ? -1 : 1)
                            );
                        });
                        item.data = item.data.map(item => ({ x: `${item.x}`, y: item.y }));
                    }
                }
                labels = [...new Set(datasets.map(dataset => dataset.data.map(elem => elem.x)).flat())];
            } else {
                if(!this.content.labels) {
                    labels = [];
                } else if(!Array.isArray(this.content.labels)) {
                    labels = Object.values(this.content.labels);
                } else {
                    labels = this.content.labels;
                }

                datasets = Array.isArray(this.content.datasets) ? this.content.datasets : [];
            }

            return {
                type: 'line',
                data: {
                    labels,
                    datasets,
                },
                options: {
                    onClick: e => {
                        const position = getRelativePosition(e, this.chartInstance);
                        const points = this.chartInstance.getElementsAtEventForMode(
                            e,
                            this.options?.interaction?.mode || 'nearest',
                            { intersect: this.options?.interaction?.intersect ?? true },
                            true
                        );

                        // Substitute the appropriate scale IDs
                        const dataX = this.chartInstance.scales.x.getValueForPixel(position.x);
                        const dataY = this.chartInstance.scales.y.getValueForPixel(position.y);
                        this.$emit('trigger-event', {
                            name: 'chart:click',
                            event: {
                                dataX,
                                dataY,
                                position,
                                points: points.map(point => ({
                                    datasetLabel: this.chartInstance.data.datasets[point.datasetIndex].label,
                                    label: this.chartInstance.data.labels[point.index],
                                    value:
                                        typeof this.chartInstance.data.datasets[point.datasetIndex].data[
                                            point.index
                                        ] === 'object'
                                            ? this.chartInstance.data.datasets[point.datasetIndex].data[point.index]['y']
                                            : this.chartInstance.data.datasets[point.datasetIndex].data[point.index],
                                    ...point,
                                })),
                            },
                        });
                    },
                    ...this.options,
                },
            };
        },
    },
    watch: {
        'config.data.datasets'() {
            this.chartInstance.data.datasets = this.config.data.datasets;
            if (this.chartInstance) this.chartInstance.destroy();
            this.initChart();
            this.chartInstance.update();
        },
        options: {
            deep: true,
            handler() {
                this.chartInstance.data.datasets = this.config.data.datasets;
                if (this.chartInstance) this.chartInstance.destroy();
                this.initChart();
                this.chartInstance.update();
            },
        },
        'config.data.labels'() {
            this.chartInstance.data.labels = this.config.data.labels;
            this.chartInstance.update();
        },
        'content.isLegend'() {
            this.chartInstance.options.plugins.legend.display = this.content.isLegend;
            this.chartInstance.update();
        },
        'content.legendPosition'() {
            this.chartInstance.options.plugins.legend.position = this.content.legendPosition;
            this.chartInstance.update();
        },
        'content.legendAlignement'() {
            this.chartInstance.options.plugins.legend.align = this.content.legendAlignement;
            this.chartInstance.update();
        },
        'content.legendColor'() {
            this.chartInstance.options.plugins.legend.labels.color = wwLib.getStyleFromToken(this.content.legendColor) || this.content.legendColor;
            this.chartInstance.update();
        },
        'content.labelColor'() {
            this.chartInstance.options.scales.x.ticks.color = wwLib.getStyleFromToken(this.content.labelColor) || this.content.labelColor;
            this.chartInstance.options.scales.y.ticks.color = wwLib.getStyleFromToken(this.content.labelColor) || this.content.labelColor;
            this.chartInstance.update();
        },
        'content.legendSize'() {
            this.chartInstance.options.plugins.legend.labels.font.size = parseInt(this.content.legendSize);
            this.chartInstance.options.scales.x.ticks.font.size = parseInt(this.content.legendSize);
            this.chartInstance.options.scales.y.ticks.font.size = parseInt(this.content.legendSize);
            this.chartInstance.update();
        },
        'content.gridColor'() {
            this.chartInstance.options.scales.x.grid.borderColor = wwLib.getStyleFromToken(this.content.gridColor) || this.content.gridColor;
            this.chartInstance.options.scales.x.grid.color = wwLib.getStyleFromToken(this.content.gridColor) || this.content.gridColor;
            this.chartInstance.options.scales.y.grid.borderColor = wwLib.getStyleFromToken(this.content.gridColor) || this.content.gridColor;
            this.chartInstance.options.scales.y.grid.color = wwLib.getStyleFromToken(this.content.gridColor) || this.content.gridColor;
            this.chartInstance.update();
        },
        'content.startAtZero'() {
            if (this.chartInstance) this.chartInstance.destroy();
            this.initChart();
        },
        'content.cubicInterpolationMode'() {
            this.chartInstance.options.elements.line.cubicInterpolationMode = this.content.cubicInterpolationMode;
            this.chartInstance.update();
        },
        'content.dataYField'() {
            // eslint-disable-next-line vue/require-explicit-emits
            this.$emit('update:content:effect', { dataYFieldProperty: null });
        },
        'content.dataYFieldProperty'() {
            const data =
                (!this.content.data || Array.isArray(this.content.data) ? this.content.data : this.content.data.data) ||
                [];
            let field = _.get(data[0], this.content.dataYField);
            const isArray = Array.isArray(field);
            if (Array.isArray(field) && field.length)
                field = _.get(field[0], this.content.dataYFieldProperty, field[0]);
            const isNumber = Number.isFinite(data[0] && this.content.dataYField && field);
            if (isNumber) {
                // eslint-disable-next-line vue/require-explicit-emits
                this.$emit('update:content:effect', { aggregate: isArray ? 'sum' : 'value' });
            }
        },
        'content.dataXField'() {
            // eslint-disable-next-line vue/require-explicit-emits
            this.$emit('update:content:effect', { dataXFieldProperty: null });
        },
        'content.groupBy'() {
            // eslint-disable-next-line vue/require-explicit-emits
            this.$emit('update:content:effect', { groupByProperty: null });
        },
    },
    mounted() {
        this.initChart();
    },
    beforeUnmount() {
        this.chartInstance.destroy();
    },
    methods: {
        initChart() {
            const element = this.$refs.chartjsLine;
            this.chartInstance = new Chart(element, this.config);
        },
        aggregate(operator, data) {
            if (!data) return undefined;
            switch (operator) {
                case 'item-count':
                    return [data].flat().length;
                case 'distinct':
                    return [...new Set([data].flat())].length;
                case 'value':
                    return [data].flat()[0];
                case 'sum':
                    return this.sum([data].flat());
                case 'average':
                    return this.average([data].flat());
                case 'median':
                    return this.median([data].flat());
                case 'min':
                    return Math.min(...[data].flat());
                case 'max':
                    return Math.max(...[data].flat());
            }
        },
        median(arr) {
            const mid = Math.floor(arr.length / 2),
                nums = [...arr].sort((a, b) => a - b);
            return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
        },
        sum(arr) {
            return arr.reduce((a, b) => a + b, 0);
        },
        average(arr) {
            return arr.reduce((a, b) => a + b, 0) / arr.length;
        },
    },
};
</script>

<style lang="scss" scoped></style>
