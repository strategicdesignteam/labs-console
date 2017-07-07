import d3 from 'd3';
import c3 from 'c3';
import React from 'react';

class ChartComponent extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
    this._generateChart(this.props.data, this.props.type, this.props.options);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.columns !== this.props.data.columns) {
      this._generateChart(this.props.data, this.props.type, this.props.options);
    }
  }

  componentWillUnmount() {
    this._destroyChart();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.data.columns.length !== nextProps.data.columns.length) {
      // shallow check
      return true;
    }
    else if (
      JSON.stringify(this.props.data.columns) !==
      JSON.stringify(nextProps.data.columns)
    ) {
      // deeper check
      return true;
    }
    return false;
  }

  _generateChart(data, type, options) {
    let config = Object.assign(
      {},
      {
        bindto: this.node,
        colors: data.colors || {},
        data: {
          columns: data.columns,
          type
        },
        legend: data.legend || {},
        tooltip: data.tooltip || {},
        size: data.size || {}
      },
      options
    );

    if (type === 'pie') {
      config = {
        ...config,
        pie: {
          expand: true,
          label: {
            show: false
          }
        }
      };
    }

    this.chart = c3.generate(config);
  }

  _destroyChart() {
    this.chart.destroy();
  }

  render() {
    return (
      <div className="pie-chart-pf"
        id={this.props.element}
        ref={(c) => {
          this.node = c;
        }}
        style={this.props.styles}/>
    );
  }
}

export default ChartComponent;
