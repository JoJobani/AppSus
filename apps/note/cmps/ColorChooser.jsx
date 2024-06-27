export function ColorChooser({ onColorChange }) {
    const colors = [
        'var(--note-color-sand)',
        'var(--note-color-coral)',
        'var(--note-color-peach)',
        'var(--note-color-mint)',
        'var(--note-color-sage)',
        'var(--note-color-fog)',
        'var(--note-color-storm)',
        'var(--note-color-dusk)',
        'var(--note-color-blossom)',
        'var(--note-color-clay)',
        'var(--note-color-chalk)'
    ]

    return (
        <div className="color-chooser">
            {colors.map((color, index) => (
                <button
                    key={index}
                    style={{ backgroundColor: color }}
                    onClick={() => onColorChange(color)}
                />
            ))}
        </div>
    )
}