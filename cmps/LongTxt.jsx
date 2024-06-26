
const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const displayText = isExpanded ? txt : txt.slice(0, length)
    const shouldShowToggle = txt.length > length

    return (
        <div>
            <p>
                {displayText}
                {!isExpanded && shouldShowToggle && '...'}
            </p>
            {shouldShowToggle && (
                <button onClick={toggleExpand}>
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            )}
        </div>
    )
}