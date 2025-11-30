import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function BieuDoDong({ value, max, isDanhMuc, className }) {
    const percent = (value / max) * 100;

    const data = [
        {
            name: "progress",
            current: percent,
            remaining: 100 - percent,
        },
    ];

    return (
        <div className={className} style={{ width: "100%", height: isDanhMuc ? 18 : 20 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    barCategoryGap={0}
                >
                    <XAxis type="number" hide />
                    <YAxis type="category" hide dataKey="name" />

                    <Bar dataKey="current" stackId="a" fill="#ff5d85ff" radius={[8, 0, 0, 8]} />
                    <Bar dataKey="remaining" stackId="a" fill={isDanhMuc ? "#88caffff" : "#00e45bff"} radius={[0, 8, 8, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
