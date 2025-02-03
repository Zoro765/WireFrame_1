import React from 'react';
import Plot from 'react-plotly.js';

interface VelocityData {
name: string;
velocity: number;
distribution: number;
size: number;
}

const data: VelocityData[] = [
{ name: "CLIGHT", velocity: 40, distribution: 58, size: 1000 },
{ name: "FRESH", velocity: 60, distribution: 40, size: 800 },
{ name: "FRISCO", velocity: 180, distribution: 25, size: 600 },
{ name: "TANG", velocity: 200, distribution: 55, size: 1200 },
{ name: "QUALIMAX", velocity: 20, distribution: 20, size: 400 },
{ name: "FRUCTUS", velocity: 40, distribution: 15, size: 300 },
{ name: "MID", velocity: 120, distribution: 22, size: 500 },
{ name: "OUTRA MARCA", velocity: 160, distribution: 12, size: 400 }
];

// Dark Pastel Purple Shades
const colors = ['#6A0DAD', '#7D3C98', '#8E44AD', '#A569BD', '#76448A', '#5B2C6F', '#4A235A', '#613659'];

export function Velocity_Vs_Distribution() {
// Transform data for Plotly
const plotData = {
x: data.map((item) => item.velocity), // Velocity
y: data.map((item) => item.distribution), // Distribution
mode: 'markers',
marker: {
size: data.map((item) => item.size / 20), // Adjust size scaling
color: colors, // Assign colors
opacity: 0.9,
line: {
color: 'white',
width: 2
}
},
text: data.map((item) => item.name), // Product names for hover
hoverinfo: 'text+x+y'
};

return (
<Plot
data={[plotData]}
layout={{
title: 'Velocity vs Distribution',
xaxis: {
title: 'Velocity',
range: [0, 220] // Set domain for X-axis
},
yaxis: {
title: 'Distribution %',
range: [0, 60] // Set domain for Y-axis
},
hovermode: 'closest',
showlegend: false,
width: 800,
height: 400,
margin: { l: 60, r: 20, b: 60, t: 40 }
}}
/>
);
}