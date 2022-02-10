import { useEffect, useState } from 'react';
import { Cell, PieChart, Pie, ResponsiveContainer } from 'recharts';
import { ChartData, Ingredient } from '../../models';
import { parseIngredientsChartData } from '../../utils';

export const IngredientsChart = ({ ingredients }: { ingredients: Ingredient[] }) => {
  const [data, setData] = useState<ChartData[]>([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    setData(parseIngredientsChartData(ingredients));
  }, [ingredients]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
