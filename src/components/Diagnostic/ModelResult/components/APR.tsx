import Plot from 'react-plotly.js';

interface DataPoint {
  promotion: string;
  actualVolume: number;
  priceElasticity: number;
}

const data: DataPoint[] = [
  {promotion: 'TANJS1SNJ0 PROMOCAO',actualVolume: 115000000,priceElasticity: 1.3},
  {promotion: 'FRISC2S1SNJ0 PROMOCAO',actualVolume: 40000000,priceElasticity: 1.5},
  {promotion: 'TRINK21SNJ0 PROMOCAO',actualVolume: 25000000,priceElasticity: 2.6},
  {promotion: 'FR34S1S1SNJ0 PROMOCAO',actualVolume: 18000000,priceElasticity: 0.7},
  {promotion: 'MASATA2S1SNJ0 PROMOCAO',actualVolume: 10000000,priceElasticity: 1.2},
  {promotion: 'FRIJCTS1S1SNJ0 PROMOCAO',actualVolume: 8000000,priceElasticity: 1.2},
  {promotion: 'BRAS2LKS2S1SNJ0 PROMOCAO',actualVolume: 7000000,priceElasticity: 1.5},
  {promotion: 'OUTRAS MARCAS1S1SNJ0 PROMOCAO',actualVolume: 6000000,priceElasticity: 2.0},
  {promotion: 'MFO2S1SNJ0 PROMOCAO',actualVolume: 5000000,priceElasticity: 2.2},
  {promotion: 'FTTS1SNJ0 PROMOCAO',actualVolume: 4000000,priceElasticity: 3.0},
  {promotion: 'QUALIMAXS1S1SNJ0 PROMOCAO',actualVolume: 2000000,priceElasticity: 0.4}
];

const PriceElasticityChart = () => {
  const plotData = [{
    type: 'scatter',
    mode: 'markers+text',
    x: data.map(item => item.priceElasticity),
    y: data.map(item => item.actualVolume),
    text: data.map(item => item.promotion),
    textposition: 'top center',
    textfont: {
      size: 10,
      color: '#333'
    },
    marker: {
      size: 15,
      color: '#68246D',
      opacity: 0.8
    },
    hovertemplate:
      '<b>%{text}</b><br>' +
      'Price Elasticity: %{x:.2f}<br>' +
      'Actual Volume: %{y:,.0f}<br>' +
      '<extra></extra>'
  }];

  const layout = {
    title: {
      text: '',
      x: 0,
      font: {
        size: 14
      }
    },
    xaxis: {
      title: {
        text: 'Avg Price Elasticity',
        font: {
          size: 15,
          color: '#666'
        },
        standoff: 20  // Adds some space between axis and its title
      },
      range: [0, 3.2],
      dtick: 0.2,
      gridcolor: '#eee',
      showgrid: true,
      zeroline: false,
      showline: true,
      linecolor: '#ccc'
    },
    yaxis: {
      title: {
        text: 'Actual Volume',
        font: {
          size: 15,
          color: '#666'
        },
        standoff: 20  // Adds some space between axis and its title
      },
      range: [0, 120000000],
      gridcolor: '#eee',
      tickformat: ',d',
      showgrid: true,
      zeroline: false,
      showline: true,
      linecolor: '#ccc'
    },
    plot_bgcolor: 'white',
    width: 1700,
    height: 500,
    showlegend: false,
    margin: {
      t: 50,
      l: 100,  // Increased left margin to accommodate axis label
      r: 20,
      b: 70    // Increased bottom margin to accommodate axis label
    },
    font: {
      family: 'Arial, sans-serif'  // Matches the font style in the image
    }
  };

  const config = {
    responsive: true,
    displayModeBar: false  // Removes the plotly toolbar
  };

  return (
    <div className="w-full">
      <Plot
        data={plotData}
        layout={layout}
        config={config}
      />
    </div>
  );
};

export default PriceElasticityChart;