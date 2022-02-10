import { useEffect, useState } from 'react';
import { Cell, Legend, PieChart, Pie } from 'recharts';
import { ChartData, Ingredient } from '../../models';
import { parseIngredientsChartData } from '../../utils';

export const IngredientsChart = ({ ingredients }: { ingredients: Ingredient[] }) => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    setData(parseIngredientsChartData(ingredients));
  }, [ingredients]);

  return (
    <div className="d-flex">
      <Legend
        layout="vertical"
        align="left"
        verticalAlign="middle"
        iconType="square"
        iconSize={20}
        wrapperStyle={{ position: 'relative', margin: 20, top: 'unset', left: 'unset' }}
        payload={data.map(({ name, color }) => ({ value: name, type: 'square', color }))}
      />

      <PieChart height={120} width={120}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={60}>
          {data.map((datum, index) => (
            <Cell key={`cell-${index}`} fill={datum.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
