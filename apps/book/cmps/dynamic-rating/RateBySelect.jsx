export function RateBySelect({ rating, handleChange }) {

    function onSelectRating(newRating) {
        const target = { name: 'rating', value: +newRating }
        handleChange({ target })
    }

    return (
        <div>
            <label htmlFor="rating">Rating: </label>
            <select name="rating"
                id="rating"
                value={rating}
                onChange={(ev) => { onSelectRating(ev.target.value) }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
}