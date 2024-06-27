export function Chart({ data, type }) {
    return (
        <ul className="chart">
            {
                data.map((item) =>
                    <li key={item.title}>
                        <span
                            title={item.title}
                            style={{ height: item.value + '%' }}
                        >
                            {type === 'percentage' ? item.value + '%' : item.value}
                        </span>
                    </li>
                )
            }
        </ul>
    )
}