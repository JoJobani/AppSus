import { RateBySelect } from "./dynamic-rating/RateBySelect.jsx"
import { RateByStars } from "./dynamic-rating/RateByStars.jsx"
import { RateByTextbox } from "./dynamic-rating/RateByTextbox.jsx"

const { useState } = React

export function AddReview({ onAddReview }) {
    const [review, setReview] = useState({
        fullName: '',
        rating: '1',
        readAt: ''
    })

    const [cmpType, setCmpType] = useState('select')

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }
        setReview(prevReview => ({
            ...prevReview, [field]: value
        }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onAddReview(review)
        setReview({
            fullName: '',
            rating: '1',
            readAt: ''
        })
    }

    return (
        <section>
            <p>Write a review:</p>
            <form onSubmit={handleSubmit}>
                <section className="name-and-date">
                    <div>
                        <label htmlFor="fullName"></label>
                        <input type="text" id="fullName" name="fullName" onChange={handleChange} placeholder="full name" required />
                    </div>
                    <div>
                        <label htmlFor="readAt">Read at:</label>
                        <input type="date" id="readAt" name="readAt" onChange={handleChange} />
                    </div>
                </section>
                <section className="rating">
                    <select value={cmpType} onChange={(ev) => setCmpType(ev.target.value)}>
                        <option value="select">Select rating</option>
                        <option value="stars">Stars rating</option>
                        <option value="textbox">Textbox rating</option>
                    </select>
                    <DynamicCmp
                        {...review}
                        cmpType={cmpType}
                        handleChange={handleChange}
                    />
                </section>

                <button>Submit review</button>
            </form>
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'select':
            return <RateBySelect {...props} />
        case 'stars':
            return <RateByStars {...props} />
        case 'textbox':
            return <RateByTextbox {...props} />
        default:
            null
    }
}