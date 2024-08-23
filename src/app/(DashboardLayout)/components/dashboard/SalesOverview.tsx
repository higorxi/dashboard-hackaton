import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProductionOverview = () => {

    // select
    const [month, setMonth] = React.useState('1');

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // Valores mensais simulados para a produção, com variações que resultam em uma média anual de 29 a 30 milhões de latas.
    const productionData = [2400000, 2500000, 2300000, 2600000, 2400000, 2550000, 2450000, 2500000, 2600000, 2500000, 2550000, 2400000];

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
            labels: {
                formatter: function (val: number) {
                    return val.toLocaleString(); // Formata os números como string com separadores de milhar
                }
            }
        },
        xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };

    const seriescolumnchart: any = [
        {
            name: 'Produção em Latas',
            data: productionData,
        },
    ];

    return (
        <DashboardCard title="Visão Geral de Produção em Latas" action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={1}>Janeiro 2024</MenuItem>
                <MenuItem value={2}>Fevereiro 2024</MenuItem>
                <MenuItem value={3}>Março 2024</MenuItem>
                <MenuItem value={4}>Abril 2024</MenuItem>
                <MenuItem value={5}>Maio 2024</MenuItem>
                <MenuItem value={6}>Junho 2024</MenuItem>
                <MenuItem value={7}>Julho 2024</MenuItem>
                <MenuItem value={8}>Agosto 2024</MenuItem>
                <MenuItem value={9}>Setembro 2024</MenuItem>
                <MenuItem value={10}>Outubro 2024</MenuItem>
                <MenuItem value={11}>Novembro 2024</MenuItem>
                <MenuItem value={12}>Dezembro 2024</MenuItem>
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height={370} width={"100%"}
            />
        </DashboardCard>
    );
};

export default ProductionOverview;
