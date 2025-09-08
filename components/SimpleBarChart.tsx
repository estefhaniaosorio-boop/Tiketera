
import React from 'react';
import { ChartDataPoint } from '../types';

interface SimpleBarChartProps {
  data: ChartDataPoint[];
  // Colors will be taken from theme, or Tailwind classes directly if needed
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
}) => {
  const chartHeight = 300;
  const barWidth = 30;
  const barGroupSpacing = 20; 
  const barInGroupSpacing = 5; 

  // Use fixed colors based on theme structure (primary.dark, danger.dark)
  // These are Tailwind class names. For actual SVG fill, direct hex or `currentColor` with parent styling is needed.
  // For simplicity, we'll assume Tailwind handles these through class names on SVG elements.
  // If specific hex values are needed regardless of theme changes, define them here.
  // For Tailwind JIT, these specific fill classes might need to be present or whitelisted.
  // Let's use more direct fill classes.
  const barColors = {
    disponibles: 'fill-primary-dark', // Defined in index.html's tailwind.config
    consumidas: 'fill-danger-dark',  // Defined in index.html's tailwind.config
  };
  
  const maxValue = Math.max(...data.flatMap(d => [d.disponibles, d.consumidas]), 0);
  
  const yAxisLabelsCount = 5;
  const yAxisLabels = Array.from({ length: yAxisLabelsCount + 1 }, (_, i) => 
    Math.round((maxValue / yAxisLabelsCount) * i)
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Transacciones Disponibles vs Consumidas (Últimos Meses)</h3>
      <div className="relative">
        <svg
          className="w-full"
          height={chartHeight + 50} 
          aria-labelledby="chartTitle"
          role="img"
        >
          <title id="chartTitle">Gráfico de transacciones disponibles versus consumidas</title>
          <g className="y-axis" aria-hidden="true">
            {yAxisLabels.map((label, i) => {
              const y = chartHeight - (label / maxValue) * chartHeight;
              return (
                <g key={`y-label-${i}`}>
                  <text x="0" y={y + 4} className="text-xs fill-gray-500" dominantBaseline="middle">
                    {label}
                  </text>
                  {label > 0 && <line x1="30" y1={y} x2={(data.length * (barWidth * 2 + barInGroupSpacing + barGroupSpacing)) + 30} y2={y} className="stroke-gray-200" strokeDasharray="2,2"/>}
                </g>
              );
            })}
          </g>
           <line x1="30" y1={chartHeight} x2={(data.length * (barWidth * 2 + barInGroupSpacing + barGroupSpacing)) + 30} y2={chartHeight} className="stroke-gray-300"/>


          <g className="bars" transform="translate(40, 0)">
            {data.map((item, index) => {
              const disponiblesHeight = maxValue > 0 ? (item.disponibles / maxValue) * chartHeight : 0;
              const consumidasHeight = maxValue > 0 ? (item.consumidas / maxValue) * chartHeight : 0;
              const xGroupBase = index * (barWidth * 2 + barInGroupSpacing + barGroupSpacing);

              return (
                <g key={item.month} className="bar-group" role="listitem" aria-label={`Mes ${item.month}: ${item.disponibles} disponibles, ${item.consumidas} consumidas.`}>
                  {/* Disponibles Bar */}
                  <rect
                    x={xGroupBase}
                    y={chartHeight - disponiblesHeight}
                    width={barWidth}
                    height={disponiblesHeight}
                    className={`${barColors.disponibles}`} // Removed hover:opacity-80
                  >
                    <title>{`Mes: ${item.month}, Disponibles: ${item.disponibles}`}</title>
                  </rect>
                  {/* Consumidas Bar */}
                  <rect
                    x={xGroupBase + barWidth + barInGroupSpacing}
                    y={chartHeight - consumidasHeight}
                    width={barWidth}
                    height={consumidasHeight}
                    className={`${barColors.consumidas}`} // Removed hover:opacity-80
                  >
                     <title>{`Mes: ${item.month}, Consumidas: ${item.consumidas}`}</title>
                  </rect>
                  <text
                    x={xGroupBase + barWidth + barInGroupSpacing / 2}
                    y={chartHeight + 20}
                    className="text-xs fill-gray-600 text-center"
                    textAnchor="middle"
                    aria-hidden="true"
                  >
                    {item.month}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="flex justify-center mt-4 space-x-4" aria-hidden="true">
        <div className="flex items-center">
          <span className={`w-3 h-3 ${barColors.disponibles.replace('fill-','bg-')} mr-2 rounded-sm`}></span>
          <span className="text-xs text-gray-600">Disponibles</span>
        </div>
        <div className="flex items-center">
          <span className={`w-3 h-3 ${barColors.consumidas.replace('fill-','bg-')} mr-2 rounded-sm`}></span>
          <span className="text-xs text-gray-600">Consumidas</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleBarChart;