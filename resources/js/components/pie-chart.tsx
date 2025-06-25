'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartData } from '@/types/diagnosa';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

interface ChartConfigType {
    [key: string]: {
        label: string;
        color?: string;
    };
}

const COLORS = [
    '#0088FE', // Blue
    '#00C49F', // Teal
    '#FFBB28', // Gold
    '#FF8042', // Orange
    '#8884D8', // Purple
    '#82CA9D', // Mint
    '#FF6B6B', // Coral
    '#4ECDC4', // Tiffany Blue
    '#45B7D1', // Sky Blue
    '#FF9F1C', // Bright Orange
    '#A05195', // Dusty Purple
    '#F95D6A', // Pink
    '#D45087', // Raspberry
    '#665191', // Deep Purple
    '#10829A', // Ocean Blue
    '#FFD166', // Lemon Yellow
    '#06D6A0', // Emerald
    '#118AB2', // Steel Blue
    '#073B4C', // Navy
    '#EF476F', // Watermelon
    '#7FDBFF', // Light Sky Blue
    '#2ECC40', // Green
    '#FF851B', // Pumpkin
    '#B10DC9', // Violet
    '#FFDC00', // Yellow
];

interface PieChartProps {
    chart_data: ChartData[];
    title: string;
    children?: React.ReactNode;
    activeIndex?: number;
    handleChange?: (index: number) => void;
}

export function PieChartComponent({ chart_data, title, children, activeIndex, handleChange }: PieChartProps) {
    const chartConfigValue: ChartConfigType = {
        values: {
            label: 'Nilai',
        },
    };

    chart_data.forEach((chart) => {
        chartConfigValue[chart.penyakit] = {
            label: chart.penyakit,
        };
    });

    const chartConfig = chartConfigValue satisfies ChartConfig;
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chart_data}
                            dataKey="persentase"
                            nameKey="penyakit"
                            innerRadius={60}
                            activeIndex={activeIndex}
                            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => <Sector {...props} outerRadius={outerRadius + 10} />}
                        >
                            {chart_data.map((entry, index) => (
                                <Cell
                                    onClick={() => {
                                        if (handleChange) handleChange(index);
                                    }}
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">{children}</div>
            </CardFooter>
        </Card>
    );
}
