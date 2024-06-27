export function RateByStars({ rating, handleChange }) {

    function onStarRating(newRating) {
        const target = { name: 'rating', value: +newRating }
        handleChange({ target })
    }

    return (
        <div className={"star-rating"}>
            {[...Array(5)].map((_, idx) => (
                <span
                    key={idx}
                    className={`star ${idx < rating ? 'on' : 'off'}`}
                    onClick={() => onStarRating(idx + 1)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    )
}