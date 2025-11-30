import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
    CartesianGrid, LabelList, Cell, ResponsiveContainer
} from 'recharts';

const COLORS = ['#6be8ec', '#f5ff9f', '#8fe293', '#f6c8fc'];

const BieuDoCot = ({ anUong, muaSam, giaiTri, khac, dinhMuc, className }) => {

    const data = [
        { name: 'Ăn Uống', money: anUong },
        { name: 'Mua Sắm', money: muaSam },
        { name: 'Giải Trí', money: giaiTri },
        { name: 'Khác', money: khac },
    ];

    return (
        <div className={className} style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, dinhMuc]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="money">
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <LabelList
                            dataKey="money"
                            position="top"
                            formatter={(money) => money.toLocaleString()}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BieuDoCot