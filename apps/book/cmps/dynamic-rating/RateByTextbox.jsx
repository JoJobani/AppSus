export function RateByTextbox({ rating, handleChange }) {

    function onTextRating(newRating) {
        const target = { name: 'rating', value: +newRating }
        handleChange({ target })
    }

    return (
        <div>
            <label htmlFor="rating">Type rating:</label>
            <input name="rating"
                id="rating"
                value={rating}
                onChange={(ev) => { onTextRating(ev.target.value) }}
                type="number"
                min="1"
                max="5"
            >
            </input>
        </div>
    )
}